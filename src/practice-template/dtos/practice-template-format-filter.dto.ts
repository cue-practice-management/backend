import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";
import { IsOptional } from "class-validator";

export class PracticeTemplateFormatFilterDto extends PaginationQueryDto {
    @IsOptional()
    template?: string;
    @IsOptional()
    name?: string;
} 