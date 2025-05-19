import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CityFilterDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsMongoId()
  @IsOptional()
  country?: string;
}
