import { VALIDATION_MESSAGES } from "@common/constants/validation.messages";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { FACULTY_CONSTRAINTS } from "faculty/constants/faculty.constants";

export class CreateFacultyRequestDto {
    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @MinLength(FACULTY_CONSTRAINTS.NAME.MIN_LENGTH)
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    name: string;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    @MinLength(FACULTY_CONSTRAINTS.DESCRIPTION.MIN_LENGTH)
    description: string;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    deanName: string;

    @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
    deanEmail: string;
}