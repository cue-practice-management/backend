import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserSeeder } from './seeders/user.seeder';
import { UserMapper } from './mappers/user.mapper';
import { UserRole } from '@common/enums/role.enum';
import { StudentSchema } from 'student/schemas/student.schema';
import { ProfessorSchema } from 'professor/schemas/professor.schema';
import { CompanyMentorSchema } from 'company-mentor/schemas/company-mentor.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.discriminator(UserRole.STUDENT, StudentSchema);
          schema.discriminator(UserRole.PROFESSOR, ProfessorSchema);
          schema.discriminator(UserRole.COMPANY_MENTOR, CompanyMentorSchema);
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService, UserSeeder, UserMapper],
  exports: [UserService, UserMapper, MongooseModule],
})
export class UserModule {}
