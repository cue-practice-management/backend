import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { DocumentType } from '@common/enums/document-type.enum';
import { Gender } from '@common/enums/gender.enum';
import { IsColombianPhone } from '@common/validators/colombian-phone.validator';
import { IsValidDocumentNumber } from '@common/validators/document.validator';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBaseUserDto {
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

  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string;
}
