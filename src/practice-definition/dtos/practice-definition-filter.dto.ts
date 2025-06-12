import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";
import { IsMongoId, IsOptional } from "class-validator";

export class PracticeDefinitionFilterDto extends PaginationQueryDto {
    @IsOptional()
    name?: string;
    @IsOptional()
    @IsMongoId()
    academicProgram?: string;
}