import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";

export class PracticeTemplateFilterDto extends PaginationQueryDto {
    name?: string;
}