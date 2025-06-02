import { Injectable } from '@nestjs/common';
import { CompanyMapper } from 'company/mappers/company.mapper';
import { PaginateResult } from 'mongoose';
import { CompanyMentorResponseDto } from '../dtos/company-mentor-response.dto';
import { Company } from 'company/schemas/company.schema';
import { PaginatedResult } from '@common/types/paginated-result';
import { CompanyMentor } from 'company-mentor/schemas/company-mentor.schema';


@Injectable()
export class CompanyMentorMapper {
  constructor(private readonly companyMapper: CompanyMapper) {}

  toCompanyMentorResponseDto(
    mentor: CompanyMentor,
  ): CompanyMentorResponseDto {
    return {
      _id: mentor._id.toString(),
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      email: mentor.email,
      photoUrl: mentor.photoUrl,
      typeOfDocument: mentor.typeOfDocument,
      gender: mentor.gender,
      role: mentor.role,
      phoneNumber: mentor.phoneNumber,
      documentNumber: mentor.documentNumber,
      company: this.companyMapper.toCompanyResponseDto(
        mentor.company as unknown as Company,
      ),
      position: mentor.position,
      createdAt: mentor.createdAt,
      updatedAt: mentor.updatedAt,
    };
  }

  toCompanyMentorPaginatedResponseDto(
    paginatedMentors: PaginateResult<CompanyMentor>,
  ): PaginatedResult<CompanyMentorResponseDto> {
    return {
      totalDocs: paginatedMentors.totalDocs,
      limit: paginatedMentors.limit,
      totalPages: paginatedMentors.totalPages,
      page: paginatedMentors.page,
      docs: paginatedMentors.docs.map((mentor) =>
        this.toCompanyMentorResponseDto(mentor),
      ),
    };
  }
}
