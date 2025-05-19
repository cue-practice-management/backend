import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';

export class CountryFilter extends PaginationQueryDto {
  name?: string;
}
