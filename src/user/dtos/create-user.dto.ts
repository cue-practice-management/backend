import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { IsValidDocumentNumber } from '@common/validators/document.validator';
import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { IsColombianPhone } from '@common/validators/colombian-phone.validator';
import { Gender } from '@common/enums/gender.enum';
import { IsStrongPassword } from '@common/validators/password.validator';
import { UserRole } from '@common/enums/role.enum';
import { DocumentType } from '@common/enums/document-type.enum';

export class CreateUserDto {
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  firstName: string;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  lastName: string;

  @IsEnum(DocumentType, { message: VALIDATION_MESSAGES.INVALID_ENUM })
  typeOfDocument: DocumentType;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsValidDocumentNumber({
    message: VALIDATION_MESSAGES.INVALID_DOCUMENT_FORMAT,
  })
  documentNumber: string;

  @IsOptional()
  @IsString()
  @IsColombianPhone({ message: VALIDATION_MESSAGES.INVALID_PHONE_CO })
  phoneNumber?: string;

  @IsOptional()
  @IsDateString({}, { message: VALIDATION_MESSAGES.INVALID_DATE })
  birthDate?: Date;

  @IsEnum(Gender, { message: VALIDATION_MESSAGES.INVALID_ENUM })
  gender: Gender;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;

  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsStrongPassword({ message: VALIDATION_MESSAGES.PASSWORD_TOO_WEAK })
  password: string;

  @IsEnum(UserRole, { message: VALIDATION_MESSAGES.INVALID_ENUM })
  role: UserRole;
}
