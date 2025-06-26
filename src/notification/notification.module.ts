import { Module } from '@nestjs/common';
import { StudentCompanyLinkingProcessListener } from './listeners/student-company-linking-process.notification.listener';
import { StudentCompanyContractListener } from './listeners/student-company-contract.notification.listener';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { EmailModule } from 'email/email.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Notification.name,
                schema: NotificationSchema
            }
        ]),
        EmailModule
    ],
    providers: [StudentCompanyLinkingProcessListener, StudentCompanyContractListener, NotificationService],
})
export class NotificationModule { }
