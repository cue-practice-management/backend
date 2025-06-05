import {
    IsDate,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StudentCompanyContractStatus } from '../enums/student-company-contract-status.enum';
import { StudentCompanyContractCancelledBy } from '../enums/student-company-contract-cancelled-by.enum';

export class CreateStudentCompanyContractRequestDto {
    @IsMongoId()
    @IsNotEmpty()
    student: string;

    @IsMongoId()
    @IsNotEmpty()
    company: string;

    @IsEnum(StudentCompanyContractStatus)
    status: StudentCompanyContractStatus;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @IsOptional()
    isPaid?: boolean;

    @ValidateIf(o => o.status === StudentCompanyContractStatus.CANCELLED)
    @IsNotEmpty()
    @IsString()
    cancellationReason?: string;

    @ValidateIf(o => o.status === StudentCompanyContractStatus.CANCELLED)
    @Type(() => Date)
    @IsDate()
    cancellationDate?: Date;

    @ValidateIf(o => o.status === StudentCompanyContractStatus.CANCELLED)
    @IsEnum(StudentCompanyContractCancelledBy)
    cancelledBy?: StudentCompanyContractCancelledBy;
}
