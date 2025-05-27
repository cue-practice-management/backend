import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { FILE_EXCEPTIONS } from 'file/constants/file.constants';

export class FileFormatNotValidException extends BaseHttpException {
  constructor() {
    super(
      FILE_EXCEPTIONS.FILE_FORMAT_NOT_VALID.code,
      FILE_EXCEPTIONS.FILE_FORMAT_NOT_VALID.message,
      HttpStatus.BAD_REQUEST,
    );
  }
}
