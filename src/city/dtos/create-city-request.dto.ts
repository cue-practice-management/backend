import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCityRequestDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  name: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsMongoId({ message: VALIDATION_MESSAGES.REQUIRED })
  country: string;
}
