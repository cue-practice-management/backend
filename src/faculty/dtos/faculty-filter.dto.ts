import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class FacultyFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  deanName?: string;

  @IsOptional()
  @IsEmail()
  deanEmail?: string;
}
