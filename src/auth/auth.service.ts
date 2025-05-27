import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { User } from '@user/schemas/user.schema';
import { UserService } from '@user/user.service';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import {
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
} from './dtos/refresh-token.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';
import * as bcrypt from 'bcryptjs';
import { UserNotFoundException } from './exceptions/user-not-found-exception';
import { AccountDisabledException } from './exceptions/account-disabled.exception';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { UserMapper } from '@user/mappers/user.mapper';
import { LogoutRequestDto } from './dtos/logout.dto';
import { OtpService } from 'otp/otp.service';
import { OtpPurpose } from 'otp/enums/otp.enums';
import { RecoverPasswordRequestDto } from './dtos/recover-password-request.dto';
import { EmailService } from 'email/email.service';
import { EMAIL_TEMPLATE_IDS } from 'email/email.config';
import { RecoverPasswordValidateRequestDto } from './dtos/recover-password-validate-reques.dto';
import { RecoverPasswordValidateResponseDto } from './dtos/recover-password-validate-response.dto';
import { RecoverResetPasswordRequestDto } from './dtos/recover-reset-password-request.dto';
import { InvalidResetPasswordTokenException } from './exceptions/invalid-reset-password-token';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
    private readonly env: EnvironmentConfigService,
    private readonly userMapper: UserMapper,
  ) {}

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(loginRequestDto.email);

    if (!user) throw new InvalidCredentialsException();

    if (user.deleted) throw new AccountDisabledException();

    const isPasswordValid = await bcrypt.compare(
      loginRequestDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new InvalidCredentialsException();

    return await this.generateTokens(
      user,
      loginRequestDto.deviceInfo,
      loginRequestDto.ip,
    );
  }

  async logout(logoutRequestDto: LogoutRequestDto): Promise<void> {
    await this.refreshTokenModel.findOneAndDelete({
      token: logoutRequestDto.refreshToken,
    });
  }

  async me(userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(userId);

    if (!user) throw new UserNotFoundException();

    return this.userMapper.toDto(user);
  }

  async refreshToken({
    refreshToken,
    deviceInfo,
    ip,
  }: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
    const tokenDoc = await this.refreshTokenModel
      .findOneAndDelete({
        token: refreshToken,
        ip: ip,
        expiresAt: { $gt: new Date() },
      })
      .populate('user');

    if (!tokenDoc) throw new InvalidRefreshTokenException();

    const user = tokenDoc.user as unknown as User;
    return await this.generateTokens(user, deviceInfo, ip);
  }

  async recoverPassword(
    recoverPasswordRequestDto: RecoverPasswordRequestDto,
  ): Promise<void> {
    const user = await this.userService.findByEmail(
      recoverPasswordRequestDto.email,
    );

    if (!user) throw new UserNotFoundException();

    const otp = await this.otpService.generateOtp({
      userId: user._id.toString(),
      purpose: OtpPurpose.RECOVER_PASSWORD,
    });

    const variables = {
      otp: otp.otp,
      email: user.email,
    };

    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Password Recovery',
      templateId: EMAIL_TEMPLATE_IDS.FORGOT_PASSWORD,
      variables: variables,
    });
  }

  async recoverPasswordValidate(
    dto: RecoverPasswordValidateRequestDto,
  ): Promise<RecoverPasswordValidateResponseDto> {
    console.log('Validating OTP for password recovery:', dto);
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UserNotFoundException();

    await this.otpService.validate({
      userId: user._id.toString(),
      purpose: OtpPurpose.RECOVER_PASSWORD,
      code: dto.otp,
    });

    const token = this.jwtService.sign(
      {
        sub: user._id,
        purpose: OtpPurpose.RECOVER_PASSWORD,
      },
      { expiresIn: '10m' },
    );

    return { token };
  }

  async recoverResetPassword(
    resetPasswordRequestDto: RecoverResetPasswordRequestDto,
  ): Promise<void> {
    const { token, newPassword } = resetPasswordRequestDto;

    const payload = this.jwtService.verify(token);
    if (!payload || payload.purpose !== OtpPurpose.RECOVER_PASSWORD) {
      throw new InvalidResetPasswordTokenException();
    }

    const user = await this.userService.findById(payload.sub);
    if (!user) throw new UserNotFoundException();

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(user._id.toString(), newPassword);
    await this.logoutAllDevices(user._id.toString());
  }

  private async generateTokens(
    user: User,
    deviceInfo: string,
    ip: string,
  ): Promise<LoginResponseDto> {
    const payload = {
      sub: user._id,
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();
    const userId = user._id.toString();

    await this.saveRefreshToken(userId, refreshToken, deviceInfo, ip);

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(
    userId: string,
    refreshToken: string,
    deviceInfo: string,
    ip: string,
  ): Promise<void> {
    const expiresAt = new Date();
    const expirationDays = this.env.jwtRefreshExpirationDays;
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    await this.refreshTokenModel.updateOne(
      { user: userId, ip: ip },
      {
        $set: {
          token: refreshToken,
          deviceInfo: deviceInfo,
          expiresAt: expiresAt,
        },
      },
      { upsert: true },
    );
  }

  private async logoutAllDevices(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteMany({ user: userId });
  }
}
