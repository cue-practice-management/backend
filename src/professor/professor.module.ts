import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { AcademicProgramModule } from '@academic-program/academic-program.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './schemas/professor.schema';
import { ProfessorMapper } from './mappers/professor.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professor.name, schema: ProfessorSchema },
    ]),
    AuthModule,
    UserModule,
    AcademicProgramModule,
  ],
  providers: [ProfessorService, ProfessorMapper],
  controllers: [ProfessorController],
})
export class ProfessorModule {}
