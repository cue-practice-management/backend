import { Module } from '@nestjs/common';
import { PracticeProcessService } from './services/practice-process.service';
import { PracticeProcessController } from './controllers/practice-process.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeProcess, PracticeProcessSchema } from './schemas/practice-process.schema';
import { PracticeProcessDeliverable, PracticeProcessDeliverableSchema } from './schemas/practice-process-deliverable.schema';
import { PracticeDefinitionModule } from 'practice-definition/practice-definition.module';
import { ProfessorModule } from 'professor/professor.module';
import { StudentModule } from 'student/student.module';
import { CompanyModule } from 'company/company.module';
import { PracticeProcessMapper } from './mappers/practice-process.mapper';
import { AuthModule } from '@auth/auth.module';
import { PracticeProcessFollowUp, PracticeProcessFollowUpSchema } from './schemas/practice-process-follow-up.schema';
import { PracticeProcessDeliverableController } from './controllers/practice-process-deliverable.controller';
import { PracticeProcessDeliverableService } from './services/practice-process-deliverable.service';
import { FileModule } from 'file/file.module';
import { PracticeProcessDeliverableMapper } from './mappers/practice-process-deliverable.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeProcess.name,
        schema: PracticeProcessSchema,
      },
      {
        name: PracticeProcessDeliverable.name,
        schema: PracticeProcessDeliverableSchema,
      },
      {
        name: PracticeProcessFollowUp.name,
        schema: PracticeProcessFollowUpSchema
      }
    ]),
    PracticeDefinitionModule,
    ProfessorModule,
    StudentModule,
    CompanyModule,
    AuthModule,
    FileModule
  ],
  providers: [PracticeProcessService, PracticeProcessMapper, PracticeProcessDeliverableService, PracticeProcessDeliverableMapper],
  controllers: [PracticeProcessController, PracticeProcessDeliverableController]
})
export class PracticeProcessModule { }
