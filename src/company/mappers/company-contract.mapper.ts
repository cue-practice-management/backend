import { PaginatedResult } from '@common/types/paginated-result';
import { Injectable } from '@nestjs/common';
import { CompanyContractResponseDto } from 'company/dtos/company-contract-response.dto';
import { CompanyContract } from 'company/schemas/company-contract.schema';
import { FileService } from 'file/file.service';
import { PaginateResult } from 'mongoose';
@Injectable()
export class CompanyContractMapper {
  constructor(private readonly fileService: FileService) {}

  async toCompanyResponseDto(
    contract: CompanyContract,
  ): Promise<CompanyContractResponseDto> {
    let signedUrl: string | null = null;

    if (contract.fileUrl) {
      signedUrl = await this.fileService.getPrivateFileSignedUrl(
        contract.fileUrl,
      );
    }

    return {
      _id: contract._id.toString(),
      company: contract.company.toString(),
      fileUrl: signedUrl,
      startDate: contract.startDate,
      endDate: contract.endDate,
      status: contract.status,
      type: contract.type,
      observations: contract.observations,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
    };
  }

  async toPaginatedResponseDto(
    result: PaginateResult<CompanyContract>,
  ): Promise<PaginatedResult<CompanyContractResponseDto>> {
    return {
      docs: await Promise.all(
        result.docs.map((doc) => this.toCompanyResponseDto(doc)),
      ),
      page: result.page,
      limit: result.limit,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    };
  }
}
