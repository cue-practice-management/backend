import { VALIDATION_MESSAGES } from "@common/constants/validation.messages";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateFacultyRequestDto {
    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    name: string;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    description: string;

    @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    deanName: string;

    @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
    deanEmail: string;
}