import { UserFilterDto } from '@user/dtos/user-filter.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class CompanyMentorFilterDto extends UserFilterDto {
  @IsOptional()
  @IsMongoId()
  company?: string;

  @IsOptional()
  position?: string;
}
