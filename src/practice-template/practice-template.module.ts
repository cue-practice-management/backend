import { Module } from '@nestjs/common';
import { PracticeTemplateService } from './practice-template.service';
import { PracticeTemplateController } from './practice-template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeTemplate, PracticeTemplateSchema } from './schemas/practice-template.schema';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from 'file/file.module';
import { PracticeTemplateMapper } from './mappers/practice-template-mapper';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: PracticeTemplate.name,
      schema: PracticeTemplateSchema,
    }
  ]),
    AuthModule,
    FileModule
  ],
  providers: [PracticeTemplateService, PracticeTemplateMapper],
  controllers: [PracticeTemplateController],
})
export class PracticeTemplateModule { }
