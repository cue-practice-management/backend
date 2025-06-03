import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentCompanyLinkingProcess, StudentCompanyLinkingProcessSchema } from './schemas/student-company-linking-process.schema';
import { StudentCompanyLinkingProcessService } from './student-company-linking-process.service';
import { StudentCompanyLinkingProcessController } from './student-company-linking-process.controller';
import { CompanyModule } from 'company/company.module';
import { StudentModule } from 'student/student.module';
import { StudentCompanyLinkingProcessMapper } from './mappers/student-company-linking-process.mapper';
import { AuthModule } from '@auth/auth.module';
import { StudentCompanyLinkingProcessListener } from './listeners/student-company-linking-process.listener';
import { EmailModule } from 'email/email.module';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: StudentCompanyLinkingProcess.name,
            schema: StudentCompanyLinkingProcessSchema
        },]),
        AuthModule,
        CompanyModule,
        StudentModule,
        EmailModule
    ],
    providers: [StudentCompanyLinkingProcessService, StudentCompanyLinkingProcessMapper, StudentCompanyLinkingProcessListener],
    controllers: [StudentCompanyLinkingProcessController],
    exports: [StudentCompanyLinkingProcessService, StudentCompanyLinkingProcessMapper]
})
export class StudentCompanyLinkingProcessModule { }
