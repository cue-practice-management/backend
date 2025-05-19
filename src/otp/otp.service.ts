import { Injectable } from '@nestjs/common';
import { CreateOtpRequestDto } from './dtos/create-otp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './schemas/otp.schema';
import { Model } from 'mongoose';
import {
  OTP_CODE_EXPIRATION_MINUTES,
  OTP_CODE_LENGTH,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_INTERVAL_MS,
} from './constants/otp.constants';
import { OtpCreateTooSoonException } from './exceptions/OtpCreateTooSoonException';
import { CommonUtil } from '@common/utils/common.util';
import { ValidateOtpRequestDto } from './dtos/validate-otp.dto';
import { OtpAttemptsExceededException } from './exceptions/OtpAttemptsExceededException';
import { OtpInvalidException } from './exceptions/OtpInvalidException';
import { OtpExpiredException } from './exceptions/OtpExpiredException';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name)
    private readonly otpModel: Model<Otp>,
  ) {}

  async generateOtp({ userId, purpose }: CreateOtpRequestDto) {
    const lastOtp = await this.otpModel
      .findOne({ user: userId, purpose, used: false })
      .sort({ createdAt: -1 });

    if (
      lastOtp &&
      Date.now() - lastOtp.createdAt.getTime() < OTP_RESEND_INTERVAL_MS
    ) {
      throw new OtpCreateTooSoonException();
    }

    const code = this.generateNumericCode(OTP_CODE_LENGTH);
    const expiresAt = new Date(
      Date.now() +
        CommonUtil.fromMinutesToMilliseconds(OTP_CODE_EXPIRATION_MINUTES),
    );

    await this.otpModel.create({
      user: userId,
      code,
      purpose,
      expiresAt,
    });

    return code;
  }

  async validate({
    userId,
    purpose,
    code,
  }: ValidateOtpRequestDto): Promise<boolean> {
    const lastUserOtp = await this.otpModel
      .findOne({ user: userId, purpose, used: false })
      .sort({ createdAt: -1 });

    if (!lastUserOtp) {
      throw new OtpInvalidException();
    }

    const isValidCode = lastUserOtp.code === code;

    if (!isValidCode) {
      lastUserOtp.attempts++;
      await lastUserOtp.save();

      if (lastUserOtp.attempts >= OTP_MAX_ATTEMPTS) {
        throw new OtpAttemptsExceededException();
      }

      throw new OtpInvalidException();
    }

    if (lastUserOtp.expiresAt < new Date()) {
      throw new OtpExpiredException();
    }

    if (lastUserOtp.attempts >= OTP_MAX_ATTEMPTS) {
      throw new OtpAttemptsExceededException();
    }

    lastUserOtp.used = true;
    await lastUserOtp.save();

    return true;
  }

  private generateNumericCode(length: number): string {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }
}
