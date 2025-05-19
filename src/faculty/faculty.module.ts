import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from './schemas/faculty.schema';
import { FacultyService } from './faculty.service';
import { FacultyMapper } from './mappers/faculty.mapper';
import { FacultyController } from './faculty.controller';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Faculty.name,
        schema: FacultySchema,
      },
    ]),
    AuthModule,
  ],
  providers: [FacultyService, FacultyMapper],
  controllers: [FacultyController],
  exports: [FacultyService, FacultyMapper],
})
export class FacultyModule {}
