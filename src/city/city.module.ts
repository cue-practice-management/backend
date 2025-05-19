import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { AuthModule } from '@auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city.schema';
import { CountryModule } from '@country/country.module';
import { CityMapper } from './mapper/city-mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name,
        schema: CitySchema,
      },
    ]),
    AuthModule,
    CountryModule,
  ],
  providers: [CityService, CityMapper],
  controllers: [CityController],
  exports: [CityService, CityMapper],
})
export class CityModule {}
