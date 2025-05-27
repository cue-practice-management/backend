import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverPasswordValidateRequestDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  otp: string;
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;
}
