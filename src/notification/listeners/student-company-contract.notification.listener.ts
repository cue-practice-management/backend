import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from 'email/email.service';
import { SesTemplates } from 'email/templates/templates.enums';
import { STUDENT_COMPANY_CONTRACT_EVENTS } from 'student-company-contract/constants/student-company-contract.constants';
import { StudentCompanyContractActivatedEvent } from 'student-company-contract/events/student-company-contract-activated.event';

@Injectable()
export class StudentCompanyContractListener {
  constructor(
    private readonly emailService: EmailService,
  ) { }

  @OnEvent(STUDENT_COMPANY_CONTRACT_EVENTS.ACTIVATED)
  async handleContractActivated(
    event: StudentCompanyContractActivatedEvent,
  ): Promise<void> {
    const { student, company, startDate, endDate } =
      event.studentCompanyContract;

    await this.emailService.sendEmail({
      to: student.email,
      templateId: SesTemplates.STUDENT_COMPANY_CONTRACT_ACTIVATED,
      data: {
        studentName: `${student.firstName} ${student.lastName}`,
        companyName: company.corporateName,
        startDate: startDate!.toISOString().split('T')[0],
        endDate: endDate!.toISOString().split('T')[0],
      },
    });
  }
}
