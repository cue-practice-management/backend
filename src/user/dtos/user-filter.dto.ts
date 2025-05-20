import { PaginationQueryDto } from '@common/dtos/pagination-query.dto';
import { Gender } from '@common/enums/gender.enum';
import { IsValidDocumentNumber } from '@common/validators/document.validator';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UserFilterDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => String)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @Type(() => String)
  email?: string;

  @IsOptional()
  @IsValidDocumentNumber()
  @Type(() => String)
  documentNumber?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;
}
