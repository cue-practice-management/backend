import { Module } from '@nestjs/common';
import { CompanyMentorService } from './company-mentor.service';
import { CompanyMentorController } from './company-mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyMentor, CompanyMentorSchema } from './schemas/company-mentor.schema';
import { AuthModule } from '@auth/auth.module';
import { CompanyModule } from 'company/company.module';
import { CompanyMentorMapper } from './mappers/company-mentor.mapper';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CompanyMentor.name, schema: CompanyMentorSchema }]),
    UserModule,
    AuthModule,
    CompanyModule
  ],
  providers: [CompanyMentorService, CompanyMentorMapper],
  controllers: [CompanyMentorController],
  exports: [CompanyMentorService, CompanyMentorMapper]
})
export class CompanyMentorModule {}
