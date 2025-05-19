import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schema';
import { AuthModule } from '@auth/auth.module';
import { CountryMapper } from './mappers/country.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
    AuthModule,
  ],
  providers: [CountryService, CountryMapper],
  controllers: [CountryController],
})
export class CountryModule {}
