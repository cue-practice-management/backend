import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';

export class NewsFilterDto extends PaginationQueryDto {
  title?: string;
  tags?: string[];
}
