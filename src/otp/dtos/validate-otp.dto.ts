import { OtpPurpose } from "otp/enums/otp.enums";

export class ValidateOtpRequestDto {
    userId: string;
    code: string;
    purpose: OtpPurpose;
}