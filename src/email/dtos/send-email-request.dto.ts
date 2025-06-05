import { TemplatePayloadMap } from 'email/templates/template-payload.type';
import { SesTemplates } from 'email/templates/templates.enums';

export type SendEmailRequestDto<T extends SesTemplates = SesTemplates> = {
  to: string;
  templateId: T;
  data: TemplatePayloadMap[T];
};
