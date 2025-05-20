import { VALIDATION_MESSAGES } from "@common/constants/validation.messages";
import { CreateUserDto } from "@user/dtos/create-user.dto";
import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class CreateStudentRequestDto extends CreateUserDto {
    @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    academicProgram: string;

    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    @IsNumber({}, { message: VALIDATION_MESSAGES.REQUIRED })
    currentSemester: number;

}