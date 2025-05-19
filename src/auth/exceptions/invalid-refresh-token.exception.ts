import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@common/exceptions/base-http.exception';
import {
  EXCEPTION_CODES,
  EXCEPTION_MESSAGES,
} from '@auth/constants/auth.constants';

export class InvalidRefreshTokenException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.INVALID_REFRESH_TOKEN,
      EXCEPTION_MESSAGES.INVALID_REFRESH_TOKEN,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
