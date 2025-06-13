import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";

export class CreatePracticeProcessRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    practiceDefinition: string;

    @IsNotEmpty()
    @IsMongoId() 
    student: string;

    @IsNotEmpty()
    @IsMongoId()
    professor: string;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;
}