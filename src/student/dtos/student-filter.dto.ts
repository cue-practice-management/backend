import { UserFilterDto } from '@user/dtos/user-filter.dto';
import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class StudentFilterDto extends UserFilterDto {
  @IsOptional()
  @IsMongoId()
  @Type(() => String)
  academicProgram?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  currentSemester?: number;
}
