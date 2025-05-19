import { HttpStatus } from '@nestjs/common';

export class BaseHttpException extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: HttpStatus,
  ) {
    super(message);
  }
}
