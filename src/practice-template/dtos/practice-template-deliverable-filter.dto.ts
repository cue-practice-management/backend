import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";
import { IsOptional } from "class-validator";

export class PracticeDeliverableTemplateFilterDto extends PaginationQueryDto {
    @IsOptional()
    template?: string;
    @IsOptional()
    title?: string;
} 