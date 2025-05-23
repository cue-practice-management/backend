import { UserFilterDto } from '@user/dtos/user-filter.dto';
import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class ProfessorFilterDto extends UserFilterDto {
  @IsOptional()
  @IsMongoId()
  @Type(() => String)
  academicProgram?: string;
}
