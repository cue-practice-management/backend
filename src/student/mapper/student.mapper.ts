import { AcademicProgramMapper } from '@academic-program/mappers/academic-program.mapper';
import { AcademicProgram } from '@academic-program/schemas/academic-program.schema';
import { PaginatedResult } from '@common/types/paginated-result';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { StudentResponseDto } from 'student/dtos/student-response.dto';
import { Student } from 'student/schemas/student.schema';

@Injectable()
export class StudentMapper {
  constructor(private readonly academicProgramMapper: AcademicProgramMapper) {}

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
      currentCompany: student.currentCompany?.toString(),
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
}
