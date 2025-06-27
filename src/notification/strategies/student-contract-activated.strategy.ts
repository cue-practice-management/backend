import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from './notification-strategy.interface';
import { StudentCompanyContractActivatedEvent } from 'student-company-contract/events/student-company-contract-activated.event';
import { SesTemplates } from 'email/templates/templates.enums';
import { NotificationChannel } from 'notification/enums/notification-channel.enum';
import { NotificationDispatcherService } from 'notification/services/notification-dispatcher.service';

@Injectable()
export class ContractActivatedNotificationStrategy implements NotificationStrategy<StudentCompanyContractActivatedEvent> {
    constructor(private readonly dispatcher: NotificationDispatcherService) { }

    supports(event: any): event is StudentCompanyContractActivatedEvent {
        return event instanceof StudentCompanyContractActivatedEvent;
    }

    async execute(event: StudentCompanyContractActivatedEvent): Promise<void> {
        const { student, company, startDate, endDate, _id: contractId } =
            event.studentCompanyContract;

        await this.dispatcher.dispatch({
            userId: student._id,
            recipientEmail: student.email,
            title: 'Tu contrato ha sido activado',
            message: `Tu contrato con ${company.corporateName} ha sido activado desde el ${startDate} hasta el ${endDate}.`,
            templateId: SesTemplates.STUDENT_COMPANY_CONTRACT_ACTIVATED,
            metadata: {
                contractId,
                studentName: `${student.firstName} ${student.lastName}`,
                companyName: company.corporateName,
                startDate: startDate ? startDate.toISOString() : '',
                endDate: endDate ? endDate.toISOString() : '',
            },
            channels: [NotificationChannel.EMAIL, NotificationChannel.WEB_SOCKET],
        });
    }
}