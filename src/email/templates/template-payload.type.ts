import { SesTemplates } from "./templates.enums";

export type TemplatePayloadMap = {
    [SesTemplates.OTP_RECOVERY]: { name: string; otp: string };
    [SesTemplates.PASSWORD_UPDATED]: { name: string};
    [SesTemplates.WELCOME]: { name: string };
};
