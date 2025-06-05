import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';
import { CompanyResponseDto } from '../dtos/company-response.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { AcademicProgramMapper } from '@academic-program/mappers/academic-program.mapper';
import { CountryMapper } from '@country/mappers/country.mapper';
import { Country } from '@country/schemas/country.schema';
import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { CityMapper } from '@city/mapper/city-mapper';
import { City } from '@city/schemas/city.schema';
import { CompanyDetailResponseDto } from 'company/dtos/company-detail-response.dto';
import { CompanyContractMapper } from './company-contract.mapper';
import { CompanyContract } from 'company/schemas/company-contract.schema';
import { CompanyBasicInfoResponseDto } from 'company/dtos/company-basic-info-responde.dto';

@Injectable()
export class CompanyMapper {
  constructor(
    private readonly academicProgramMapper: AcademicProgramMapper,
    private readonly cityMapper: CityMapper,
    private readonly countryMapper: CountryMapper,
    private readonly companyContractMapper: CompanyContractMapper,
  ) {}

  toCompanyResponseDto(company: Company): CompanyResponseDto {
    return {
      _id: company._id.toString(),
      name: company.name,
      logoUrl: company.logoUrl,
      corporateName: company.corporateName,
      nit: company.nit,
      phone: company.phone,
      websiteUrl: company.websiteUrl,
      size: company.size,
      address: company.address,
      city: this.cityMapper.toCityResponseDto(company.city as unknown as City),
      country: this.countryMapper.toCountryResponseDto(
        company.country as unknown as Country,
      ),
      associatedAcademicPrograms: Array.isArray(
        company.associatedAcademicPrograms,
      )
        ? company.associatedAcademicPrograms.map((program) =>
            this.academicProgramMapper.toAcademicProgramResponseDto(
              program as unknown as AcademicProgram,
            ),
          )
        : [],
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }

  async toCompanyDetailResponseDto(
    company: Company,
  ): Promise<CompanyDetailResponseDto> {
    const base = this.toCompanyResponseDto(company);

    const contracts = Array.isArray((company as any).contracts)
      ? await Promise.all(
          (company as any).contracts.map((contract) =>
            this.companyContractMapper.toCompanyResponseDto(
              contract as CompanyContract,
            ),
          ),
        )
      : [];

    return {
      ...(await base),
      contracts,
    };
  }

  toCompanyResponsePaginatedDto(
    paginated: PaginateResult<CompanyDocument>,
  ): PaginatedResult<CompanyResponseDto> {
    return {
      docs: paginated.docs.map((doc) => this.toCompanyResponseDto(doc)),
      totalDocs: paginated.totalDocs,
      totalPages: paginated.totalPages,
      page: paginated.page,
      limit: paginated.limit,
    };
  }

  toCompanyBasicInfoResponseDto(company: Company): CompanyBasicInfoResponseDto {
    return {
      _id: company._id.toString(),
      name: company.name,
      logoUrl: company.logoUrl,
      corporateName: company.corporateName,
      nit: company.nit,
      phone: company.phone,
      websiteUrl: company.websiteUrl,
      address: company.address,
      size: company.size,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }

  toCompanyTypeaheadItem(company: Company): TypeaheadItem {
    return {
      value: company._id.toString(),
      label: company.name,
    };
  }
}
