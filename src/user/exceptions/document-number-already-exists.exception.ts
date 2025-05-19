import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import {
  EXCEPTION_CODES,
  EXCEPTION_MESSAGES,
} from '../constants/user.exception.constants';

export class DocumentNumberAlreadyExistsException extends BaseHttpException {
  constructor() {
    super(
      EXCEPTION_CODES.USER_DOCUMENT_EXISTS,
      EXCEPTION_MESSAGES.USER_DOCUMENT_EXISTS,
      HttpStatus.CONFLICT,
    );
  }
}
