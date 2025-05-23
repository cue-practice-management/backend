import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { UpdateUserRequestDto } from '@user/dtos/update-user-request.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateProfessorRequestDto extends UpdateUserRequestDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  @IsOptional()
  @IsString()
  academicProgram?: string;
}
