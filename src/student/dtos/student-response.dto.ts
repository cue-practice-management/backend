import { AcademicProgramResponseDto } from '@academic-program/dtos/academic-program-response.dto';
import { DocumentType } from '@common/enums/document-type.enum';
import { Gender } from '@common/enums/gender.enum';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { CompanyResponseDto } from 'company/dtos/company-response.dto';

export class StudentResponseDto extends UserResponseDto {
  academicProgram: AcademicProgramResponseDto;
  phoneNumber?: string;
  typeOfDocument: DocumentType;
  gender: Gender;
  documentNumber?: string;
  currentSemester: number;
  currentCompany?: CompanyResponseDto;
  curriculumUrl?: string;
  epsCertificationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
