import { IsNotEmpty, IsString } from 'class-validator';

import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';

export class CreateCountryRequestDto {
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  name: string;
}
