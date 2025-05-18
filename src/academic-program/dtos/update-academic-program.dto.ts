import { VALIDATION_MESSAGES } from "@common/constants/validation.messages";
import { ACADEMIC_PROGRAM_CONSTRAINTS } from "academic-program/constants/academic-program.constants";
import { IsEmail, IsMongoId, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateAcademicProgramDto {
    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @MinLength(ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MIN_LENGTH)
    @MaxLength(ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MAX_LENGTH)
    name: string;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @MinLength(ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MIN_LENGTH)
    @MaxLength(ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MAX_LENGTH)
    description: string;

    @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
    faculty: string;

    @IsNumber({}, { message: VALIDATION_MESSAGES.INVALID_NUMBER })
    durationInSemesters: number;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    coordinatorName: string;

    @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
    coordinatorEmail: string;
}