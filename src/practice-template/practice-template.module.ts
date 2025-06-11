import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeTemplate, PracticeTemplateSchema } from './schemas/practice-template.schema';
import { AuthModule } from '@auth/auth.module';
import { FileModule } from 'file/file.module';
import { PracticeTemplateMapper } from './mappers/practice-template-mapper';
import { PracticeTemplateService } from './services/practice-template.service';
import { PracticeTemplateDeliverable, PracticeTemplateDeliverableSchema } from './schemas/practice-template-deliverable.schema';
import { PracticeTemplateFormat, PracticeTemplateFormatSchema } from './schemas/practice-template-format.schema';
import { PracticeTemplateDeliverableService } from './services/practice-template-deliverable.service';
import { PracticeTemplateDeliverableMapper } from './mappers/practice-template-deliverable.mapper';
import { PracticeTemplateController } from './controllers/practice-template.controller';
import { PracticeTemplateDeliverablesController } from './controllers/practice-template-deliverables.controller';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: PracticeTemplate.name,
      schema: PracticeTemplateSchema,
    },
    {
      name: PracticeTemplateDeliverable.name,
      schema: PracticeTemplateDeliverableSchema,
    },
    {
      name: PracticeTemplateFormat.name,
      schema: PracticeTemplateFormatSchema,
    }
  ]),
    AuthModule,
    FileModule
  ],
  providers: [PracticeTemplateService, PracticeTemplateMapper, PracticeTemplateDeliverableMapper ,PracticeTemplateDeliverableService],
  controllers: [PracticeTemplateController, PracticeTemplateDeliverablesController],
})
export class PracticeTemplateModule { }
