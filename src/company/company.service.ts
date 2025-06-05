import { Injectable } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyRequestDto } from './dtos/create-company-request.dto';
import { UpdateCompanyRequestDto } from './dtos/update-company-request.dto';
import { CompanyFilterDto } from './dtos/company-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { MAX_TYPEAHEAD_ITEMS } from '@common/constants/constaint.constants';
import { getSort } from '@common/utils/pagination.util';
import {
  COMPANY_POPULATION_OPTIONS,
  COMPANY_SORT_OPTIONS,
  DEFAULT_COMPANY_SORT_OPTION,
} from './constants/company.constants';
import { CompanyMapper } from './mappers/company.mapper';
import { AcademicProgramService } from '@academic-program/academic-program.service';
import { CityService } from '@city/city.service';
import { CountryService } from '@country/country.service';
import { FileService } from 'file/file.service';
import { FILE_FOLDERS } from 'file/constants/file.constants';
import {
  CompanyNameAlreadyExistsException,
  CompanyCorporateNameAlreadyExistsException,
  CompanyNitAlreadyExistsException,
  CompanyPhoneAlreadyExistsException,
} from './exceptions/company-already-exists.exception';
import { CompanyResponseDto } from './dtos/company-response.dto';
import { CompanyNotFoundException } from './exceptions/company-not-found.exception';
import { CompanyDetailResponseDto } from './dtos/company-detail-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: PaginateModel<CompanyDocument>,
    private readonly companyMapper: CompanyMapper,
    private readonly academicProgramService: AcademicProgramService,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
    private readonly fileService: FileService,
  ) {}

  async createCompany(
    dto: CreateCompanyRequestDto,
  ): Promise<CompanyResponseDto> {
    await this.validateUniqueFields(dto);
    await this.validateReferencedFields(dto);

    const company = new this.companyModel(dto);
    await company.save();
    return this.populateAndMapCompany(company);
  }

  async getCompanyById(companyId: string): Promise<CompanyDetailResponseDto> {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new CompanyNotFoundException();
    await company.populate([
      COMPANY_POPULATION_OPTIONS.CITY,
      COMPANY_POPULATION_OPTIONS.COUNTRY,
      COMPANY_POPULATION_OPTIONS.ASSOCIATED_ACADEMIC_PROGRAMS,
      COMPANY_POPULATION_OPTIONS.CONTRACTS,
    ]);
    return await this.companyMapper.toCompanyDetailResponseDto(company);
  }

  async updateCompany(
    companyId: string,
    dto: UpdateCompanyRequestDto,
  ): Promise<CompanyResponseDto> {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new CompanyNotFoundException();

    await this.validateUniqueFields(dto, companyId);
    await this.validateReferencedFields(dto);

    Object.assign(company, dto);
    await company.save();
    return this.populateAndMapCompany(company);
  }

  async updateCompanyLogo(
    companyId: string,
    file: Express.Multer.File,
  ): Promise<CompanyResponseDto> {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new CompanyNotFoundException();

    if (company.logoUrl) {
      const fileKey = this.fileService.getFileKeyFromUrl(company.logoUrl);
      await this.fileService.deleteFile(fileKey, true);
    }

    const { fileUrl } = await this.fileService.uploadFile({
      file,
      isPublic: true,
      folder: FILE_FOLDERS.COMPANY_LOGOS,
    });

    company.logoUrl = fileUrl;
    await company.save();
    return this.populateAndMapCompany(company);
  }

  async deleteCompany(companyId: string): Promise<void> {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new CompanyNotFoundException();
    company.softDelete();
  }

  async getByCriteria(
    filter: CompanyFilterDto,
  ): Promise<PaginatedResult<CompanyResponseDto>> {
    const query = this.buildFilterQuery(filter);
    const sort = getSort(
      COMPANY_SORT_OPTIONS,
      DEFAULT_COMPANY_SORT_OPTION,
      filter.sortBy,
      filter.sortOrder,
    );

    const result: PaginateResult<CompanyDocument> =
      await this.companyModel.paginate(query, {
        page: filter.page,
        limit: filter.limit,
        sort,
        populate: [
          COMPANY_POPULATION_OPTIONS.CITY,
          COMPANY_POPULATION_OPTIONS.COUNTRY,
          COMPANY_POPULATION_OPTIONS.ASSOCIATED_ACADEMIC_PROGRAMS,
        ],
      });

    return this.companyMapper.toCompanyResponsePaginatedDto(result);
  }

  async getCompanyTypeahead(query: string): Promise<TypeaheadItem[]> {
    const companies = await this.companyModel
      .find({ name: { $regex: `^${query}`, $options: 'i' } })
      .limit(MAX_TYPEAHEAD_ITEMS);

    return companies.map((company) =>
      this.companyMapper.toCompanyTypeaheadItem(company),
    );
  }

  async validateCompanyExists(companyId: string): Promise<void> {
    const exists = await this.companyModel.exists({ _id: companyId });
    if (!exists) throw new CompanyNotFoundException();
  }

  private buildFilterQuery(filter: CompanyFilterDto): Record<string, any> {
    const query: Record<string, any> = {};
    if (filter.name) query.name = new RegExp(filter.name, 'i');
    if (filter.nit) query.nit = filter.nit;
    if (filter.countryId) query.country = filter.countryId;
    if (filter.cityId) query.city = filter.cityId;
    return query;
  }

  private async validateUniqueFields(
    dto: UpdateCompanyRequestDto | CreateCompanyRequestDto,
    excludeId?: string,
  ): Promise<void> {
    const checks = [
      {
        field: 'name',
        value: dto.name,
        Exception: CompanyNameAlreadyExistsException,
      },
      {
        field: 'corporateName',
        value: dto.corporateName,
        Exception: CompanyCorporateNameAlreadyExistsException,
      },
      {
        field: 'nit',
        value: dto.nit,
        Exception: CompanyNitAlreadyExistsException,
      },
      {
        field: 'phone',
        value: dto.phone,
        Exception: CompanyPhoneAlreadyExistsException,
      },
    ];

    for (const check of checks) {
      if (!check.value) continue;
      const query: Record<string, any> = { [check.field]: check.value };
      if (excludeId) query._id = { $ne: excludeId };

      const exists = await this.companyModel.exists(query);
      if (exists) throw new check.Exception();
    }
  }

  private async validateReferencedFields(
    dto: UpdateCompanyRequestDto | CreateCompanyRequestDto,
  ): Promise<void> {
    if (dto.city) await this.cityService.validateCityExists(dto.city);
    if (dto.country) await this.countryService.validateCountryExists(dto.country);
    if (dto.associatedAcademicPrograms) {
      await this.academicProgramService.validateManyAcademicProgramsExist(
        dto.associatedAcademicPrograms,
      );
    }
  }

  private async populateAndMapCompany(
    company: CompanyDocument,
  ): Promise<CompanyResponseDto> {
    await company.populate([
      COMPANY_POPULATION_OPTIONS.CITY,
      COMPANY_POPULATION_OPTIONS.COUNTRY,
      COMPANY_POPULATION_OPTIONS.ASSOCIATED_ACADEMIC_PROGRAMS,
    ]);
    return this.companyMapper.toCompanyResponseDto(company);
  }
}
