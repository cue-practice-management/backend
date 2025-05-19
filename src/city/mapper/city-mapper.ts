import { CityResponseDto } from '@city/dtos/city-response.dto';
import { City } from '@city/schemas/city.schema';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { CountryMapper } from '@country/mappers/country.mapper';
import { Country } from '@country/schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

@Injectable()
export class CityMapper {
  constructor(private readonly countryMapper: CountryMapper) {}

  toCityResponseDto(city: City): CityResponseDto {
    return {
      _id: city._id.toString(),
      name: city.name,
      country: this.countryMapper.toCountryResponseDto(
        city.country as unknown as Country,
      ),
      createdAt: city.createdAt,
      updatedAt: city.updatedAt,
    };
  }

  toPaginatedCityResponseDto(
    paginatedResult: PaginateResult<City>,
  ): PaginatedResult<CityResponseDto> {
    return {
      docs: paginatedResult.docs.map((city) => this.toCityResponseDto(city)),
      totalDocs: paginatedResult.totalDocs,
      limit: paginatedResult.limit,
      totalPages: paginatedResult.totalPages,
      page: paginatedResult.page,
    };
  }

  toTypeaheadItem(city: City): TypeaheadItem {
    return {
      value: city._id.toString(),
      label: city.name,
    };
  }
}
