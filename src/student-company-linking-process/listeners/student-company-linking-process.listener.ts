import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EmailService } from "email/email.service";
import { SesTemplates } from "email/templates/templates.enums";
import { STUDENT_COMPANY_LINKING_PROCESS_EVENT } from "student-company-linking-process/constants/student-company-linking-process-event.constants";
import { StudentCompanyLinkingProcessAcceptedEvent } from "student-company-linking-process/events/student-company-linking-process-accepted.event";
import { StudentCompanyLinkingProcessCreatedEvent } from "student-company-linking-process/events/student-company-linking-process-created.event";

@Injectable()
export class StudentCompanyLinkingProcessListener {

    constructor(
        private readonly emailService: EmailService,
    ) { }

    @OnEvent(STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_CREATED)
    async handleStudentCompanyLinkingProcessCreatedEvent(event: StudentCompanyLinkingProcessCreatedEvent): Promise<void> {
        const { student, company } = event.studentCompanyLinkingProcess;
        await this.emailService.sendEmail({
            to: student.email,
            templateId: SesTemplates.STUDENT_COMPANY_LINKING_PROCESS_CREATED,
            data: { studentName: `${student.firstName} ${student.lastName}`, companyName: company.corporateName },
        });
    }

    @OnEvent(STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED)
    async handleStudentCompanyLinkingProcessAcceptedEvent(event: StudentCompanyLinkingProcessAcceptedEvent): Promise<void> {
        const { student, company } = event.studentCompanyLinkingProcess;
        /* TODO: Send email to admin and student, create the company contract.
        await this.emailService.sendEmail({
            to: student.email,
            templateId: SesTemplates.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED,
            data: { studentName: `${student.firstName} ${student.lastName}`, companyName: company.corporateName },
        });
        */
    }

}