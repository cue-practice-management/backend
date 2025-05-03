import { BaseHttpException } from "@common/exceptions/base-http.exception";
import { HttpStatus } from "@nestjs/common";
import { EXCEPTION_CODES, EXCEPTION_MESSAGES } from "otp/constants/otp.constants";

export class OtpInvalidException extends BaseHttpException{
    constructor() {
        super(
            EXCEPTION_CODES.OTP_INVALID,
            EXCEPTION_MESSAGES.OTP_INVALID,
            HttpStatus.BAD_REQUEST,
        );
    }
}