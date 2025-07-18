import { SesTemplates } from './templates.enums';

export type TemplatePayloadMap = {
  [SesTemplates.OTP_RECOVERY]: { name: string; otp: string };
  [SesTemplates.PASSWORD_UPDATED]: { name: string };
  [SesTemplates.WELCOME]: { name: string };
  [SesTemplates.STUDENT_COMPANY_LINKING_PROCESS_CREATED]: {
    studentName: string;
    companyName: string;
  };
  [SesTemplates.STUDENT_COMPANY_LINKING_PROCESS_ACCEPTED]: {
    studentName: string;
    companyName: string;
  };
  [SesTemplates.STUDENT_COMPANY_CONTRACT_ACTIVATED]: {
    contractId: string;
    studentName: string;
    companyName: string;
    startDate: string;
    endDate: string;
  };
};
