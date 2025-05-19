import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { PaginateModel } from 'mongoose';
import { CountryMapper } from './mappers/country.mapper';
import { CreateCountryRequestDto } from './dtos/create-country-request.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CountryFilter } from './dtos/country-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import {
  COUNTRY_SORT_OPTIONS,
  DEFAULT_COUNTRY_SORT_OPTION,
} from './constants/country.constants';
import { getSortDirection } from '@common/utils/pagination.util';
import { CountryNotFoundException } from './exceptions/country-not-found-exception';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { UpdateCountryRequestDto } from './dtos/update-country-request.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: PaginateModel<CountryDocument>,
    private readonly countryMapper: CountryMapper,
  ) {}

  async createCountry(
    createCountryRequestDto: CreateCountryRequestDto,
  ): Promise<CountryResponseDto> {
    const country = new this.countryModel(createCountryRequestDto);
    await country.save();

    return this.countryMapper.toCountryResponseDto(country);
  }

  async getCountryByCriteria(
    countryFilter: CountryFilter,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    const { page, limit, sortBy, sortOrder } = countryFilter;

    const query: Record<string, any> = this.buildFilterQuery(countryFilter);

    const validatedSortBy =
      COUNTRY_SORT_OPTIONS.find((option) => option === sortBy) ||
      DEFAULT_COUNTRY_SORT_OPTION;
    const sort = {
      [validatedSortBy]: getSortDirection(sortOrder),
    };

    const result = await this.countryModel.paginate(query, {
      page,
      limit,
      sort,
    });

    return this.countryMapper.toPaginatedCountryResponseDto(result);
  }

  async updateCountry(
    countryId: string,
    updateCountryRequestDto: UpdateCountryRequestDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryModel.findById(countryId);
    if (!country) {
      throw new CountryNotFoundException();
    }

    Object.assign(country, updateCountryRequestDto);
    await country.save();

    return this.countryMapper.toCountryResponseDto(country);
  }

  async deleteCountry(countryId: string): Promise<void> {
    const country = await this.countryModel.findById(countryId);
    if (!country) {
      throw new CountryNotFoundException();
    }

    await country.softDelete();
  }

  async getCountryTypeahead(query: string): Promise<TypeaheadItem[]> {
    const countries = await this.countryModel
      .find({
        name: { $regex: query, $options: 'i' },
      })
      .limit(10);

    return countries.map((country) =>
      this.countryMapper.toTypeaheadItem(country),
    );
  }

  private buildFilterQuery(filter: CountryFilter): Record<string, any> {
    const query: Record<string, any> = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }

    return query;
  }
}
