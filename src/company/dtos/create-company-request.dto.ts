import { IsNotEmpty, IsString, MinLength, IsUrl, IsMongoId, IsOptional } from 'class-validator';
import { VALIDATION_MESSAGES } from '@common/constants/validation.messages';
import { COMPANY_CONSTRAINTS } from '../constants/company.constants';
import { IsColombianPhone } from '@common/validators/colombian-phone.validator';

export class CreateCompanyRequestDto {
    @IsString()
    @MinLength(COMPANY_CONSTRAINTS.NAME.MIN_LENGTH)
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    name: string;

    @IsString()
    @MinLength(COMPANY_CONSTRAINTS.CORPORATE_NAME.MIN_LENGTH)
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    corporateName: string;

    @IsString()
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    nit: string;

    @IsString()
    @IsColombianPhone({ message: VALIDATION_MESSAGES.INVALID_PHONE_CO })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    phone: string;

    @IsUrl({}, { message: VALIDATION_MESSAGES.INVALID_URL })
    websiteUrl: string;

    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    address: string;

    @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    country: string;

    @IsMongoId({ message: VALIDATION_MESSAGES.INVALID_MONGO_ID })
    @IsNotEmpty({ message: VALIDATION_MESSAGES.REQUIRED })
    city: string;

    @IsOptional()
    associatedAcademicPrograms?: string[];
}
