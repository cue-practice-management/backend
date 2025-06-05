import { DocumentType } from '@common/enums/document-type.enum';
import { Gender } from '@common/enums/gender.enum';
import { UserResponseDto } from '@user/dtos/user-response.dto';
import { CompanyResponseDto } from 'company/dtos/company-response.dto';

export class CompanyMentorResponseDto extends UserResponseDto {
  phoneNumber?: string;
  typeOfDocument: DocumentType;
  gender: Gender;
  documentNumber?: string;
  company: CompanyResponseDto;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}
