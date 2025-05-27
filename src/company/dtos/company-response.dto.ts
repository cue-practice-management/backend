import { AcademicProgramResponseDto } from '@academic-program/dtos/academic-program-response.dto';
import { CityResponseDto } from '@city/dtos/city-response.dto';
import { CountryResponseDto } from '@country/dtos/country-response.dto';

export class CompanyResponseDto {
  _id: string;
  name: string;
  logoUrl?: string;
  corporateName: string;
  nit: string;
  phone: string;
  websiteUrl: string;
  address: string;
  city: CityResponseDto;
  country: CountryResponseDto;
  associatedAcademicPrograms?: AcademicProgramResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
