import { UpdateUserRequestDto } from '@user/dtos/update-user-request.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyMentorRequestDto extends UpdateUserRequestDto {
  @IsMongoId()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  position?: string;
}
