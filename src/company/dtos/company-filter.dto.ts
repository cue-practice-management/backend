import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';

export class CompanyFilterDto extends PaginationQueryDto {
  name?: string;
  nit?: string;
  countryId?: string;
  cityId?: string;
  acdemicProgram?: string;
}
