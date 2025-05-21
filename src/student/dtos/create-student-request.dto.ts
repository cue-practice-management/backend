import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { CreateBaseUserDto } from '@user/dtos/create-base-user.dto';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentRequestDto extends CreateBaseUserDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  academicProgram: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNumber({}, { message: VALIDATION_MESSAGES.REQUIRED })
  currentSemester: number;
}
