import { OtpPurpose } from 'otp/enums/otp.enums';

export class CreateOtpRequestDto {
  userId: string;
  purpose: OtpPurpose;
}
