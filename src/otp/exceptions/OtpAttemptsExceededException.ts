import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from "otp/constants/otp.constants";

export class OtpAttemptsExceededException extends BaseHttpException{
    constructor() {
        super(
            EXCEPTION_CODES.OTP_ATTEMPTS_EXCEEDED,
            EXCEPTION_MESSAGES.OTP_ATTEMPTS_EXCEEDED,
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}