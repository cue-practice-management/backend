import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { UserRole } from '@common/enums/role.enum';
import { Roles } from '@common/decorators/role.decorator';
import { CreateCountryRequestDto } from './dtos/create-country-request.dto';
import { CountryFilter } from './dtos/country-filter.dto';
import { UpdateCountryRequestDto } from './dtos/update-country-request.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createCountry(
    @Body() createCountryRequestDto: CreateCountryRequestDto,
  ) {
    return await this.countryService.createCountry(createCountryRequestDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getByCriteria(@Query() filter: CountryFilter) {
    return this.countryService.getCountryByCriteria(filter);
  }

  @Get('typeahead')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getCountryTypeahead(@Query('query') query: string) {
    return await this.countryService.getCountryTypeahead(query);
  }

  @Put('update/:countryId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateCountry(
    @Param('countryId', ParseObjectIdPipe) countryId: string,
    @Body() updateCountryRequestDto: UpdateCountryRequestDto,
  ) {
    return await this.countryService.updateCountry(
      countryId,
      updateCountryRequestDto,
    );
  }

  @Delete('delete/:countryId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async deleteCountry(
    @Param('countryId', ParseObjectIdPipe) countryId: string,
  ) {
    return await this.countryService.deleteCountry(countryId);
  }
}
