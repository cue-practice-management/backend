import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { UpdateUserRequestDto } from '@user/dtos/update-user-request.dto';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentRequestDto extends UpdateUserRequestDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  @IsOptional()
  @IsString()
  academicProgram?: string;

  @IsOptional()
  @IsNumber()
  currentSemester?: number;

  @IsOptional()
  @IsString()
  currentCompany?: string;
}
