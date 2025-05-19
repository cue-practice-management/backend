import { CountryResponseDto } from '@country/dtos/country-response.dto';

export class CityResponseDto {
  _id: string;
  name: string;
  country: CountryResponseDto;
  createdAt: Date;
  updatedAt: Date;
}
