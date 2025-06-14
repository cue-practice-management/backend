import { Type } from "class-transformer";
import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";

export class StartPracticeProcessRequestDto {
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
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate() 
    endDate: Date;
}