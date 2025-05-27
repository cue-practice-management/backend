import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecoverResetPasswordRequestDto {
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  token: string;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  newPassword: string;
}
