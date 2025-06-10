import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";

export class PracticeDeliverableTemplateFilterDto extends PaginationQueryDto {
    template?: string;
    title?: string;
} 