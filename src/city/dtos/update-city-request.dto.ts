import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCityRequestDto {
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  name?: string;

  @IsMongoId({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsOptional()
  country?: string;
}
