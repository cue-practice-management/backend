import { VALIDATION_MESSAGES } from "@common/constants/validation.messages";
import { IsEmail, IsOptional, MinLength } from "class-validator";
import { FACULTY_CONSTRAINTS } from "faculty/constants/faculty.constants";

export class UpdateFacultyRequestDto {
    @IsOptional()
    @MinLength(FACULTY_CONSTRAINTS.NAME.MIN_LENGTH)
    name?: string;

    @IsOptional()
    @MinLength(FACULTY_CONSTRAINTS.DESCRIPTION.MIN_LENGTH)
    description?: string;

    @IsOptional()
    deanName?: string;

    @IsOptional()
    @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
    deanEmail?: string;
}