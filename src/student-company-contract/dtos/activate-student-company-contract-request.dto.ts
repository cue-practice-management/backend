import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class ActivateStudentCompanyContractRequestDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsBoolean()
  @Type(() => Boolean)
  isPaid: boolean;
}
