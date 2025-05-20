import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { AcademicProgramModule } from '@academic-program/academic-program.module';
import { CompanyModule } from 'company/company.module';
import { StudentMapper } from './mapper/student.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    AuthModule,
    UserModule,
    AcademicProgramModule,
    CompanyModule,
  ],
  providers: [StudentService, StudentMapper],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
