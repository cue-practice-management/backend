import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EmailService } from "email/email.service";
import { SesTemplates } from "email/templates/templates.enums";
import { STUDENT_COMPANY_CONTRACT_EVENTS } from "student-company-contract/constants/student-company-contract.constants";
import { StudentCompanyContractActivatedEvent } from "student-company-contract/events/student-company-contract-activated.event";
import { StudentCompanyContractService } from "student-company-contract/student-company-contract.service";
import { STUDENT_COMPANY_LINKING_PROCESS_EVENT } from "student-company-linking-process/constants/student-company-linking-process-event.constants";
import { StudentCompanyLinkingProcessAcceptedEvent } from "student-company-linking-process/events/student-company-linking-process-accepted.event";
import { StudentService } from "student/student.service";

@Injectable()
export class StudentCompanyContractListener {
    constructor(
        private readonly contractService: StudentCompanyContractService,
        private readonly studentService: StudentService,
        private readonly emailService: EmailService,
    ) { }

    @OnEvent(STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED)
    async handleContractCreation(event: StudentCompanyLinkingProcessAcceptedEvent): Promise<void> {
        const { student, company } = event.studentCompanyLinkingProcess;
        await this.contractService.createStudentCompanyContractFromLinkingProcess({
            student: student._id,
            company: company._id,
            linkingProcess: event.studentCompanyLinkingProcess._id,
        });
    }

    @OnEvent(STUDENT_COMPANY_CONTRACT_EVENTS.ACTIVATED)
    async handleContractActivated(event: StudentCompanyContractActivatedEvent): Promise<void> {
        console.log("Handling contract activation event", event);
        const { student, company, startDate, endDate } = event.studentCompanyContract;

        await this.studentService.updateStudent(student._id, { currentCompany: company._id, });

        await this.emailService.sendEmail({
            to: student.email,
            templateId: SesTemplates.STUDENT_COMPANY_CONTRACT_ACTIVATED,
            data: {
                studentName: `${student.firstName} ${student.lastName}`,
                companyName: company.corporateName,
                startDate: startDate!.toISOString().split("T")[0],
                endDate: endDate!.toISOString().split("T")[0],
            },

        })
    }
}