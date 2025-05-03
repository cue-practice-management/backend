import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from "otp/constants/otp.constants";

export class OtpCreateTooSoonException extends BaseHttpException {
    constructor() {
        super(EXCEPTION_CODES.OTP_CREATE_TOO_SOON, EXCEPTION_MESSAGES.OTP_CREATE_TOO_SOON, HttpStatus.TOO_MANY_REQUESTS);
    }
}