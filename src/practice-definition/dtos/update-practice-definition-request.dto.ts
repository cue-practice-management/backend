import { IsMongoId, IsOptional, Max, Min } from "class-validator";
import { PRACTICE_DEFINITION_CONTRAINTS } from "practice-definition/constants/practice-definition.constants";

export class UpdatePracticeDefinitionRequestDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @Min(PRACTICE_DEFINITION_CONTRAINTS.SEMESTER.MIN)
    @Max(PRACTICE_DEFINITION_CONTRAINTS.SEMESTER.MAX)
    semester?: number;

    @IsOptional()
    @IsMongoId()
    academicProgram?: string;

    @IsOptional()
    @IsMongoId()
    practiceTemplate?: string;
}