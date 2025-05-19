import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class AcademicProgramFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsMongoId()
  @IsOptional()
  faculty?: string;
}
