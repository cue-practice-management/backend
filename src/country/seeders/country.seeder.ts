import { AppLogger } from '@common/loggers/app.logger';
import { Country } from '@country/schemas/country.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CountrySeeder implements OnModuleInit {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: PaginateModel<Country>,
    private readonly logger: AppLogger,
  ) {}

  COUNTRIES: { name: string }[] = [
    { name: 'Colombia' },
    { name: 'Argentina' },
    { name: 'Chile' },
    { name: 'México' },
    { name: 'España' },
    { name: 'Estados Unidos' },
    { name: 'Perú' },
    { name: 'Brasil' },
  ];

  async onModuleInit() {
    await this.seedCountries();
  }

  async seedCountries() {
    for (const country of this.COUNTRIES) {
      const existingCountry = await this.countryModel.findOne({
        name: country.name,
      });
      if (!existingCountry) {
        await this.countryModel.create(country);
        this.logger.log(`Seeded country: ${country.name}`);
      } else {
        this.logger.log(`Country already exists: ${country.name}`);
      }
    }
  }
}
