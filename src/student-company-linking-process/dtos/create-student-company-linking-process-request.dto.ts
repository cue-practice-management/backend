import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateStudentCompanyLinkingProcessRequestDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  student: string;

  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  company: string;

  @IsOptional()
  observations?: string;
}
