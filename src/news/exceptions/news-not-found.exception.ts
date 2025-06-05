import { BaseHttpException } from '@common/exceptions/base-http.exception';
import { HttpStatus } from '@nestjs/common';
import { NEWS_EXCEPTIONS } from 'news/constants/news.constants';

export class NewsNotFoundException extends BaseHttpException {
  constructor() {
    super(
      NEWS_EXCEPTIONS.NOT_FOUND.code,
      NEWS_EXCEPTIONS.NOT_FOUND.message,
      HttpStatus.NOT_FOUND,
    );
  }
}
