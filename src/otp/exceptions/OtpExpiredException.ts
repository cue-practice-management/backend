import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import {
  EXCEPTION_CODES,
  EXCEPTION_MESSAGES,
} from 'otp/constants/otp.constants';

export class OtpExpiredException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.OTP_EXPIRED,
      EXCEPTION_MESSAGES.OTP_EXPIRED,
      HttpStatus.BAD_REQUEST,
    );
  }
}
