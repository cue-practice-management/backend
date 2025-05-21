import { AcademicProgramResponseDto } from '@academic-program/dtos/academic-program-response.dto';
import { DocumentType } from '@common/enums/document-type.enum';
import { Gender } from '@common/enums/gender.enum';
import { UserResponseDto } from '@user/dtos/user-response.dto';

export class StudentResponseDto extends UserResponseDto {
  academicProgram: AcademicProgramResponseDto;
  phoneNumber?: string;
  typeOfDocument: DocumentType;
  gender: Gender;
  documentNumber?: string;
  currentSemester: number;
  currentCompany?: string;
  curriculumUrl?: string;
  epsCertificationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
