import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { CountryResponseDto } from '@country/dtos/country-response.dto';
import { Country } from '@country/schemas/country.schema';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

@Injectable()
export class CountryMapper {
  toCountryResponseDto(country: Country): CountryResponseDto {
    return {
      _id: country._id.toString(),
      name: country.name,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    };
  }

  toPaginatedCountryResponseDto(
    countriesPaginated: PaginateResult<Country>,
  ): PaginatedResult<CountryResponseDto> {
    return {
      docs: countriesPaginated.docs.map((country) =>
        this.toCountryResponseDto(country),
      ),
      totalDocs: countriesPaginated.totalDocs,
      totalPages: countriesPaginated.totalPages,
      page: countriesPaginated.page,
      limit: countriesPaginated.limit,
    };
  }

  toTypeaheadItem(country: Country): TypeaheadItem {
    return {
      value: country._id.toString(),
      label: country.name,
    };
  }
}
