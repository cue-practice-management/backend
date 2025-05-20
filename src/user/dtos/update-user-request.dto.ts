import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { DocumentType } from '@common/enums/document-type.enum';
import { IsColombianPhone } from '@common/validators/colombian-phone.validator';
import { IsValidDocumentNumber } from '@common/validators/document.validator';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  typeOfDocument?: DocumentType;

  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsValidDocumentNumber({
    message: VALIDATION_MESSAGES.INVALID_DOCUMENT_FORMAT,
  })
  documentNumber?: string;

  @IsOptional()
  @IsString()
  @IsColombianPhone({ message: VALIDATION_MESSAGES.INVALID_PHONE_CO })
  phoneNumber?: string;

  @IsOptional()
  @IsDateString({}, { message: VALIDATION_MESSAGES.INVALID_DATE })
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: VALIDATION_MESSAGES.INVALID_EMAIL })
  email?: string;
}
