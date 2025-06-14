import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";
import { IsEnum, IsMongoId, IsOptional } from "class-validator";
import { PracticeProcessStatus } from "practice-process/enums/practice-process.enums";

export class PracticeProcessFilterDto extends PaginationQueryDto {
    @IsOptional()
    @IsMongoId()
    student?: string;

    @IsOptional()
    @IsMongoId()
    professor?: string;

    @IsOptional()
    @IsMongoId()
    practiceDefinition?: string;

    @IsOptional()
    @IsMongoId()
    company?: string;

    @IsOptional()
    @IsEnum(PracticeProcessStatus)
    status?: PracticeProcessStatus;

}