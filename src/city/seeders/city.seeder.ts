import { City } from '@city/schemas/city.schema';
import { AppLogger } from '@common/loggers/app.logger';
import { Country } from '@country/schemas/country.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CitySeeder implements OnModuleInit {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: PaginateModel<City>,
    @InjectModel(Country.name)
    private readonly countryModel: PaginateModel<Country>,
    private readonly logger: AppLogger,
  ) {}

  private readonly COLOMBIAN_CITIES: string[] = [
    'Armenia',
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Cúcuta',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Manizales',
    'Neiva',
    'Villavicencio',
    'Ibagué',
    'Montería',
    'Pasto',
  ];

  async onModuleInit() {
    const colombia = await this.countryModel.findOne({ name: 'Colombia' });
    if (!colombia) {
      this.logger.error('Colombia not found. Run CountrySeeder first.');
      return;
    }

    for (const name of this.COLOMBIAN_CITIES) {
      const exists = await this.cityModel.findOne({
        name,
        country: colombia._id,
      });
      if (!exists) {
        await this.cityModel.create({ name, country: colombia._id });
        this.logger.log(`Seeded city: ${name}`);
      } else {
        this.logger.log(`City already exists: ${name}`);
      }
    }
  }
}
