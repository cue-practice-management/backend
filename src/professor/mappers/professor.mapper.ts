import { AcademicProgramMapper } from '@academic-program/mappers/academic-program.mapper';
import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { PaginatedResult } from '@common/types/paginated-result';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { ProfessorResponseDto } from 'professor/dtos/profesor-response.dto';
import { Professor } from 'professor/schemas/professor.schema';

@Injectable()
export class ProfessorMapper {
  constructor(private readonly academicProgramMapper: AcademicProgramMapper) {}

  toProfessorResponseDto(professor: Professor): ProfessorResponseDto {
    return {
      _id: professor._id.toString(),
      firstName: professor.firstName,
      lastName: professor.lastName,
      email: professor.email,
      photoUrl: professor.photoUrl,
      typeOfDocument: professor.typeOfDocument,
      gender: professor.gender,
      role: professor.role,
      phoneNumber: professor.phoneNumber,
      documentNumber: professor.documentNumber,
      academicProgram: this.academicProgramMapper.toAcademicProgramResponseDto(
        professor.academicProgram as unknown as AcademicProgram,
      ),
      createdAt: professor.createdAt,
      updatedAt: professor.updatedAt,
    };
  }

  toProfessorPaginatedResponseDto(
    paginatedProfessors: PaginateResult<Professor>,
  ): PaginatedResult<ProfessorResponseDto> {
    return {
      totalDocs: paginatedProfessors.totalDocs,
      limit: paginatedProfessors.limit,
      totalPages: paginatedProfessors.totalPages,
      page: paginatedProfessors.page,
      docs: paginatedProfessors.docs.map((professor) =>
        this.toProfessorResponseDto(professor),
      ),
    };
  }
}
