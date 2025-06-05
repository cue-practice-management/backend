import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './schemas/city.schema';
import mongoose, { PaginateModel } from 'mongoose';
import { CityMapper } from './mapper/city-mapper';
import { CountryService } from '@country/country.service';
import { CreateCityRequestDto } from './dtos/create-city-request.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import {
  CITY_POPULATE_OPTIONS,
  CITY_SORT_OPTIONS,
  DEFAULT_CITY_SORT_OPTION,
} from './constants/city.constants';
import { CityFilterDto } from './dtos/city-filter.dto';
import { PaginatedResult } from '@common/types/paginated-result';
import { getSort } from '@common/utils/pagination.util';
import { UpdateCityRequestDto } from './dtos/update-city-request.dto';
import { CityNotFoundException } from './exceptions/city-not-found.exception';
import { TypeaheadItem } from '@common/dtos/typeahead-item.dto';
import { MAX_TYPEAHEAD_ITEMS } from '@common/constants/constaint.constants';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: PaginateModel<CityDocument>,
    private readonly cityMapper: CityMapper,
    private readonly countryService: CountryService,
  ) {}

  async createCity(
    createCityDto: CreateCityRequestDto,
  ): Promise<CityResponseDto> {
    const city = new this.cityModel(createCityDto);

    await this.countryService.validateCountryExists(createCityDto.country);

    await city.save();
    await city.populate(CITY_POPULATE_OPTIONS.COUNTRY);

    return this.cityMapper.toCityResponseDto(city);
  }

  async getCitiesByCriteria(
    filter: CityFilterDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    const { page, limit, sortBy, sortOrder } = filter;

    const query: Record<string, any> = this.buildFilterQuery(filter);

    const sort = getSort(
      CITY_SORT_OPTIONS,
      DEFAULT_CITY_SORT_OPTION,
      sortBy,
      sortOrder,
    );

    const paginatedResult = await this.cityModel.paginate(query, {
      page,
      limit,
      populate: CITY_POPULATE_OPTIONS.COUNTRY,
      sort,
    });

    return this.cityMapper.toPaginatedCityResponseDto(paginatedResult);
  }

  async getCityTypeahead(
    query: string,
    country?: string,
  ): Promise<TypeaheadItem[]> {
    const filter: {
      name: { $regex: string; $options: string };
      country?: mongoose.Types.ObjectId;
    } = {
      name: { $regex: query, $options: 'i' },
    };

    if (country && mongoose.Types.ObjectId.isValid(country)) {
      filter.country = new mongoose.Types.ObjectId(country);
    }

    const cities = await this.cityModel.find(filter).limit(MAX_TYPEAHEAD_ITEMS);

    return cities.map((city) => this.cityMapper.toTypeaheadItem(city));
  }

  async updateCity(
    id: string,
    updateCityDto: UpdateCityRequestDto,
  ): Promise<CityResponseDto> {
    const city = await this.cityModel.findById(id);

    if (!city) {
      throw new CityNotFoundException();
    }

    if (updateCityDto.country) {
      await this.countryService.validateCountryExists(updateCityDto.country);
    }

    Object.assign(city, updateCityDto);
    await city.save();
    await city.populate(CITY_POPULATE_OPTIONS.COUNTRY);

    return this.cityMapper.toCityResponseDto(city);
  }

  async deleteCity(id: string): Promise<void> {
    const city = await this.cityModel.findById(id);
    if (!city) {
      throw new CityNotFoundException();
    }

    await city.softDelete();
  }

  async validateCityExists(cityId: string): Promise<void> {
    const exists = await this.cityModel.exists({ _id: cityId });
    if (!exists) {
      throw new CityNotFoundException();
    }
  }

  private buildFilterQuery(filter: CityFilterDto): Record<string, any> {
    const query: Record<string, any> = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter.country) {
      query.country = filter.country;
    }

    return query;
  }
}
