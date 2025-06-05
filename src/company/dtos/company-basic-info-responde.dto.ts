import { CompanySize } from 'company/enums/company-size.enum';

export interface CompanyBasicInfoResponseDto {
  _id: string;
  name: string;
  logoUrl?: string;
  corporateName: string;
  nit: string;
  phone: string;
  websiteUrl: string;
  address: string;
  size: CompanySize;
  createdAt: Date;
  updatedAt: Date;
}
