import { Module } from '@nestjs/common';
import { PracticeDefinitionService } from './practice-definition.service';
import { PracticeDefinitionController } from './practice-definition.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeDefinition, PracticeDefinitionSchema } from './schemas/practice-definition.schema';
import { AuthModule } from '@auth/auth.module';
import { AcademicProgramModule } from '@academic-program/academic-program.module';
import { PracticeTemplateModule } from 'practice-template/practice-template.module';
import { PracticeDefinitionMapper } from './mappers/practice-definition.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeDefinition.name,
        schema: PracticeDefinitionSchema,
      }
    ]),
    AuthModule,
    AcademicProgramModule,
    PracticeTemplateModule
  ],
  providers: [PracticeDefinitionService, PracticeDefinitionMapper],
  controllers: [PracticeDefinitionController],
  exports: [PracticeDefinitionService, PracticeDefinitionMapper]
})
export class PracticeDefinitionModule {}
