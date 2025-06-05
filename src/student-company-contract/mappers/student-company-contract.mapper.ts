import { PaginatedResult } from "@common/types/paginated-result";
import { Injectable } from "@nestjs/common";
import { CompanyMapper } from "company/mappers/company.mapper";
import { Company } from "company/schemas/company.schema";
import { FileService } from "file/file.service";
import { PaginateResult } from "mongoose";
import { StudentCompanyContractResponseDto } from "student-company-contract/dtos/student-company-contract-response.dto";
import { StudentCompanyContract } from "student-company-contract/schemas/student-company-contract.schema";
import { StudentMapper } from "student/mapper/student.mapper";
import { Student } from "student/schemas/student.schema";

@Injectable()
export class StudentCompanyContractMapper {
      constructor(private readonly fileService: FileService, private readonly studentMapper: StudentMapper, private readonly companyMapper: CompanyMapper) {}
    
    async toStudentCompanyContractResponseDto(
        contract: StudentCompanyContract): Promise<StudentCompanyContractResponseDto> {
            let signedUrl: string | undefined = undefined;

            if (contract.contractUrl) {
                signedUrl = await this.fileService.getPrivateFileSignedUrl(
                    contract.contractUrl,
                );
            }

            return {
                _id: contract._id.toString(),
                student: this.studentMapper.toStudentBasicInfoResponseDto(contract.student as unknown as Student ),
                company: this.companyMapper.toCompanyBasicInfoResponseDto(contract.company as unknown as Company),
                contractUrl: signedUrl,
                startDate: contract.startDate,
                endDate: contract.endDate,
                status: contract.status,
                isPaid: contract.isPaid,
                cancellationReason: contract.cancellationReason,
                cancellationDate: contract.cancellationDate,
                createdAt: contract.createdAt,
                updatedAt: contract.updatedAt,
            };
        }


        async toStudentCompanyContractsPaginatedResponseDto(
            contracts: PaginateResult<StudentCompanyContract>,
        ): Promise<PaginatedResult<StudentCompanyContractResponseDto>> {
            const items = await Promise.all(
                contracts.docs.map((contract) =>
                    this.toStudentCompanyContractResponseDto(contract),
                ),
            );

            return {
                docs: items,
                totalDocs: contracts.totalDocs,
                totalPages: contracts.totalPages,
                page: contracts.page,
                limit: contracts.limit,
            };
        }



}