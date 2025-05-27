export class SendEmailRequestDto {
  to: string;
  subject: string;
  templateId: string;
  variables: Record<string, any>;
}
