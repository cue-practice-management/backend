import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { COMPANY_CONSTRAINTS } from '../constants/company.constants';
import { IsColombianPhone } from '@common/validators/colombian-phone.validator';
import { CompanySize } from 'company/enums/company-size.enum';

export class UpdateCompanyRequestDto {
  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(COMPANY_CONSTRAINTS.NAME.MIN_LENGTH)
  @MaxLength(COMPANY_CONSTRAINTS.NAME.MAX_LENGTH)
  name?: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(COMPANY_CONSTRAINTS.CORPORATE_NAME.MIN_LENGTH)
  @MaxLength(COMPANY_CONSTRAINTS.CORPORATE_NAME.MAX_LENGTH)
  corporateName?: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  nit?: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @IsColombianPhone({ message: VALIDATION_MESSAGES.INVALID_PHONE_CO })
  phone?: string;

  @IsOptional()
  @IsUrl({}, { message: VALIDATION_MESSAGES.INVALID_URL })
  websiteUrl?: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MESSAGES.REQUIRED })
  @MinLength(COMPANY_CONSTRAINTS.ADDRESS.MIN_LENGTH)
  @MaxLength(COMPANY_CONSTRAINTS.ADDRESS.MAX_LENGTH)
  address?: string;

  @IsOptional()
  @IsEnum(CompanySize)
  size?: CompanySize;

  @IsOptional()
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  country?: string;

  @IsOptional()
  @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
  city?: string;

  @IsOptional()
  associatedAcademicPrograms?: string[];
}
