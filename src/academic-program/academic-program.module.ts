import { Module } from '@nestjs/common';
import { AcademicProgramService } from './academic-program.service';
import { AcademicProgramController } from './academic-program.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AcademicProgram,
  AcademicProgramSchema,
} from './schemas/academic-program.schema';
import { AuthModule } from '@auth/auth.module';
import { AcademicProgramMapper } from './mappers/academic-program.mapper';
import { FacultyModule } from 'faculty/faculty.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AcademicProgram.name,
        schema: AcademicProgramSchema,
      },
    ]),
    AuthModule,
    FacultyModule,
  ],
  providers: [AcademicProgramService, AcademicProgramMapper],
  controllers: [AcademicProgramController],
})
export class AcademicProgramModule {}
