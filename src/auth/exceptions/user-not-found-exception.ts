import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';

export class UserNotFoundException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.USER_NOT_FOUND,
      EXCEPTION_MESSAGES.USER_NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }
}
