import { PaginationQueryDto } from "@common/dtos/pagination-query.dto";
import { IsEnum, IsOptional } from "class-validator";
import { CompanyContractStatus } from "company/enums/company-contract-status.enum";
import { CompanyContractType } from "company/enums/company-contract-type.enum";

export class CompanyContractFilterDto extends PaginationQueryDto {
    @IsOptional()
    @IsEnum(CompanyContractStatus)
    status?: CompanyContractStatus

    @IsOptional()
    @IsEnum(CompanyContractType)
    type?: CompanyContractType
}