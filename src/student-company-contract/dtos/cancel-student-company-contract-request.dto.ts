import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StudentCompanyContractCancelledBy } from 'student-company-contract/enums/student-company-contract-cancelled-by.enum';

export class CancelStudentCompanyContractRequestDto {
  @IsString()
  @IsNotEmpty()
  cancellationReason: string;

  @IsEnum(StudentCompanyContractCancelledBy)
  cancelledBy: StudentCompanyContractCancelledBy;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  cancellationDate: Date;
}
