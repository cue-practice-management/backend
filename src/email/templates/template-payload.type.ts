import { SesTemplates } from "./templates.enums";

export type TemplatePayloadMap = {
    [SesTemplates.OTP_RECOVERY]: { name: string; otp: string };
    [SesTemplates.PASSWORD_UPDATED]: { name: string};
    [SesTemplates.WELCOME]: { name: string };
    [SesTemplates.STUDENT_COMPANY_LINKING_PROCESS_CREATED]: { studentName: string; companyName: string };
};
