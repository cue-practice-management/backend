import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { CreateBaseUserDto } from '@user/dtos/create-base-user.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProfessorRequestDto extends CreateBaseUserDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  academicProgram: string;
}
