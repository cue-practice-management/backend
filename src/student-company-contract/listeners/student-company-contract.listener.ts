import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { StudentCompanyContractService } from "student-company-contract/student-company-contract.service";
import { STUDENT_COMPANY_LINKING_PROCESS_EVENT } from "student-company-linking-process/constants/student-company-linking-process-event.constants";
import { StudentCompanyLinkingProcessAcceptedEvent } from "student-company-linking-process/events/student-company-linking-process-accepted.event";

@Injectable()
export class StudentCompanyContractListener {
    constructor(private readonly contractService: StudentCompanyContractService) { }

    @OnEvent(STUDENT_COMPANY_LINKING_PROCESS_EVENT.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED)
    async handleContractCreation(event: StudentCompanyLinkingProcessAcceptedEvent): Promise<void> {
        const { student, company } = event.studentCompanyLinkingProcess;
        await this.contractService.createStudentCompanyContractFromLinkingProcess({
            student: student._id,
            company: company._id,
            linkingProcess: event.studentCompanyLinkingProcess._id,
        });
    }
}