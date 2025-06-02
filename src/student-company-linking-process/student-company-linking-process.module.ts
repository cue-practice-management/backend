import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentCompanyLinkingProcess, StudentCompanyLinkingProcessSchema } from './schemas/student-company-linking-process.schema';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: StudentCompanyLinkingProcess.name,
            schema: StudentCompanyLinkingProcessSchema
        }
    ])],
})
export class StudentCompanyLinkingProcessModule { }
