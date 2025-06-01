import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { CreateBaseUserDto } from '@user/dtos/create-base-user.dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyMentorRequestDto extends CreateBaseUserDto {
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  company: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  position: string;
}
