import { AcademicProgramMapper } from '@academic-program/mappers/academic-program.mapper';
import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { Injectable } from '@nestjs/common';
import { CompanyMapper } from 'company/mappers/company.mapper';
import { Company } from 'company/schemas/company.schema';
import { PaginateResult } from 'mongoose';
import { StudentResponseDto } from 'student/dtos/student-response.dto';
import { Student } from 'student/schemas/student.schema';

@Injectable()
export class StudentMapper {
  constructor(private readonly academicProgramMapper: AcademicProgramMapper, private readonly companyMapper: CompanyMapper) {}

  toStudentResponseDto(student: Student): StudentResponseDto {
    return {
      _id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      photoUrl: student.photoUrl,
      typeOfDocument: student.typeOfDocument,
      gender: student.gender,
      role: student.role,
      phoneNumber: student.phoneNumber,
      documentNumber: student.documentNumber,
      academicProgram: this.academicProgramMapper.toAcademicProgramResponseDto(
        student.academicProgram as unknown as AcademicProgram,
      ),
      currentSemester: student.currentSemester,
      currentCompany: student.currentCompany ? this.companyMapper.toCompanyResponseDto(student.currentCompany as unknown as Company) : undefined,
      curriculumUrl: student.curriculumUrl,
      epsCertificationUrl: student.epsCertificationUrl,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  toStudentPaginatedResponseDto(
    paginatedStudents: PaginateResult<Student>,
  ): PaginatedResult<StudentResponseDto> {
    return {
      totalDocs: paginatedStudents.totalDocs,
      limit: paginatedStudents.limit,
      totalPages: paginatedStudents.totalPages,
      page: paginatedStudents.page,
      docs: paginatedStudents.docs.map((student) =>
        this.toStudentResponseDto(student),
      ),
    };
  }

  toTypeaheadItem(student: Student): TypeaheadItem {
    return {
      label: `${student.firstName} ${student.lastName} - ${(student.academicProgram as unknown as AcademicProgram).name}`,
      value: student._id.toString(),
    };
  }
}
