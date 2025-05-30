import { Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import {
  CompanyContract,
  CompanyContractDocument,
} from './schemas/company-contract.schema';
import { CompanyContractMapper } from './mappers/company-contract.mapper';
import { CompanyService } from './company.service';
import { CreateCompanyContractDto } from './dtos/create-company-contract-request.dto';
import { CompanyContractResponseDto } from './dtos/company-contract-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FileService } from 'file/file.service';
import { FILE_FOLDERS } from 'file/constants/file.constants';
import { CompanyContractNotFoundException } from './exceptions/company-contract-not-found.exception';
import { UpdateCompanyContractDto } from './dtos/update-company-contract.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { CompanyContractFilterDto } from './dtos/company-contract-filter.dto';

@Injectable()
export class CompanyContractService {
  constructor(
    @InjectModel(CompanyContract.name)
    private readonly companyContractModel: PaginateModel<CompanyContractDocument>,
    private readonly companyService: CompanyService,
    private readonly fileService: FileService,
    private readonly companyContractMapper: CompanyContractMapper,
  ) { }

  async createCompanyContract(
    dto: CreateCompanyContractDto,
    companyId: string,
    file: Express.Multer.File,
  ): Promise<CompanyContractResponseDto> {
    await this.companyService.validateCompanyExists(companyId);

    const fileKey = file ? await this.uploadPrivateContractFile(file) : null;

    const contract = new this.companyContractModel({
      ...dto,
      company: companyId,
      fileUrl: fileKey,
    });

    await contract.save();
    return this.companyContractMapper.toCompanyResponseDto(contract);
  }

  async getCompanyContractsByCriteria(companyId: string, filter: CompanyContractFilterDto): Promise<PaginatedResult<CompanyContractResponseDto>> {
    await this.companyService.validateCompanyExists(companyId);
    const query = this.buildFilterQuery(filter);

    const contracts = await this.companyContractModel.paginate(
      { company: companyId, ...query },
      {
        page: filter.page,
        limit: filter.limit,
        sort: { createdAt: -1 },
      }
    );

    return this.companyContractMapper.toPaginatedResponseDto(contracts);
  }

  async updateCompanyContract(
    contractId: string,
    dto: UpdateCompanyContractDto,
    file?: Express.Multer.File,
  ): Promise<CompanyContractResponseDto> {
    const contract = await this.getContractOrThrow(contractId);

    if (file) {
      await this.deleteExistingContractFile(contract);
      contract.fileUrl = await this.uploadPrivateContractFile(file);
    }

    Object.assign(contract, dto);
    await contract.save();
    return this.companyContractMapper.toCompanyResponseDto(contract);
  }

  async deleteCompanyContract(contractId: string): Promise<void> {
    await this.getContractOrThrow(contractId);
    await this.companyContractModel.findByIdAndDelete(contractId);
  }

  private async deleteExistingContractFile(
    contract: CompanyContractDocument,
  ): Promise<void> {
    if (contract.fileUrl) {
      const fileKey = this.fileService.getFileKeyFromUrl(contract.fileUrl);
      if (fileKey) {
        await this.fileService.deleteFile(fileKey, false);
      }
    }
  }

  private async getContractOrThrow(
    id: string,
  ): Promise<CompanyContractDocument> {
    const contract = await this.companyContractModel.findById(id);
    if (!contract) throw new CompanyContractNotFoundException();
    return contract;
  }

  private async uploadPrivateContractFile(
    file: Express.Multer.File,
  ): Promise<string> {
    const { fileKey } = await this.fileService.uploadFile({
      file,
      isPublic: false,
      folder: FILE_FOLDERS.COMPANY_CONTRACTS,
    });
    return fileKey;
  }

  private buildFilterQuery(filter: CompanyContractFilterDto): Record<string, any> {
    const query: Record<string, any> = {};

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.type) {
      query.type = filter.type;
    }

    return query;
  }
}
