import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from "@auth/constants/auth.constants";
import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";

export class InvalidResetPasswordTokenException extends BaseHttpException {
  constructor() {
    super(
        EXCEPTION_CODES.INVALID_RESET_PASSWORD_TOKEN,
        EXCEPTION_MESSAGES.INVALID_RESET_PASSWORD_TOKEN,
        HttpStatus.BAD_REQUEST
    )

  }
}