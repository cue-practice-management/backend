import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ACADEMIC_PROGRAM_CONSTRAINTS } from 'academic-program/constants/academic-program.constants';

export class CreateAcademicProgramRequestDto {
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MIN_LENGTH)
  @MaxLength(ACADEMIC_PROGRAM_CONSTRAINTS.NAME.MAX_LENGTH)
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  name: string;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(ACADEMIC_PROGRAM_CONSTRAINTS.DESCRIPTION.MAX_LENGTH)
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  description: string;

  @IsMongoId({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  faculty: string;

  @IsNumber({}, { message: VALIDATION_MESSAGES.REQUIRED })
  durationInSemesters: number;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  coordinatorName: string;

  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  coordinatorEmail: string;
}
