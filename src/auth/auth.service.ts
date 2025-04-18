import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { User } from '@users/schemas/user.schema';
import { UserService } from '@users/user.service';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from './dtos/refresh-token.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { InvalidRefreshTokenException } from './exceptions/invalid-refresh-token.exception';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly env: EnvironmentConfigService,
        @InjectModel(RefreshToken.name)
        private readonly refreshTokenModel: Model<RefreshToken>
    ) { }


    async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.userService.findByEmail(loginRequestDto.email);
        if (!user) throw new InvalidCredentialsException();

        const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password);
        if (!isPasswordValid) throw new InvalidCredentialsException();

        return await this.generateTokens(user, loginRequestDto.deviceInfo, loginRequestDto.ip);
    }

    async refreshToken({ refreshToken, deviceInfo, ip }: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
        const tokenDoc = await this.refreshTokenModel.findOneAndDelete({
            token: refreshToken,
            ip: ip,
            expiresAt: { $gt: new Date() }
        }).populate('user');

        if (!tokenDoc) throw new InvalidRefreshTokenException();

        const user = tokenDoc.user as unknown as User;
        const { accessToken } = await this.generateTokens(user, deviceInfo, ip);
        return { accessToken };
    }


    private async generateTokens(user: User, deviceInfo: string, ip: string): Promise<LoginResponseDto> {
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

    private async saveRefreshToken(userId: string, refreshToken: string, deviceInfo: string, ip: string): Promise<void> {
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
            { upsert: true }
        )
    }

}
