import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from '@auth/constants/auth.constants';

export class AccountDisabledException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.ACCOUNT_DISABLED,
      EXCEPTION_MESSAGES.ACCOUNT_DISABLED,
      HttpStatus.BAD_REQUEST
    );
  }
}