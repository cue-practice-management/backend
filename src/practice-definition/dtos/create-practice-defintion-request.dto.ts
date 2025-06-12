import { IsMongoId, IsNotEmpty, Max, Min } from "class-validator";
import { PRACTICE_DEFINITION_CONTRAINTS } from "practice-definition/constants/practice-definition.constants";

export class CreatePracticeDefinitionRequestDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @Min(PRACTICE_DEFINITION_CONTRAINTS.SEMESTER.MIN)
    @Max(PRACTICE_DEFINITION_CONTRAINTS.SEMESTER.MAX)
    semester: number;

    @IsNotEmpty()
    @IsMongoId()
    academicProgram: string;

    @IsNotEmpty()
    @IsMongoId()
    practiceTemplate: string;
}