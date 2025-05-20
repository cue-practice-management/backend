import { AcademicProgramResponseDto } from '@academic-program/dtos/academic-program-response.dto';
import { UserResponseDto } from '@user/dtos/user-response.dto';

export class StudentResponseDto extends UserResponseDto {
  academicProgram: AcademicProgramResponseDto;
  phoneNumber?: string;
  documentNumber?: string;
  currentSemester: number;
  currentCompany?: string;
  curriculumUrl?: string;
  epsCertificationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
