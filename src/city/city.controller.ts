import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { RoleGuard } from '@auth/guards/role.guard';
import { Roles } from '@common/decorators/role.decorator';
import { UserRole } from '@common/enums/role.enum';
import { CreateCityRequestDto } from './dtos/create-city-request.dto';
import { CityFilterDto } from './dtos/city-filter.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateCityRequestDto } from './dtos/update-city-request.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async createCity(@Body() createCityDto: CreateCityRequestDto) {
    return await this.cityService.createCity(createCityDto);
  }

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getByCriteria(@Query() filter: CityFilterDto) {
    return this.cityService.getCitiesByCriteria(filter);
  }

  @Get('typeahead')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async getCityTypeahead(
    @Query('query') query: string,
    @Query('country') country?: string
  ) {
    return await this.cityService.getCityTypeahead(query, country);
  }

  @Put('update/:cityId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateFaculty(
    @Param('cityId', ParseObjectIdPipe) cityId: string,
    @Body() updateCityRequestDto: UpdateCityRequestDto,
  ) {
    return await this.cityService.updateCity(cityId, updateCityRequestDto);
  }

  @Delete('delete/:cityId')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  async deleteCity(@Param('cityId', ParseObjectIdPipe) cityId: string) {
    return await this.cityService.deleteCity(cityId);
  }
}
