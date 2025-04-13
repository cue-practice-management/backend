import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';

export class InvalidCredentialsException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.INVALID_CREDENTIALS,
      EXCEPTION_MESSAGES.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED
    );
  }
}