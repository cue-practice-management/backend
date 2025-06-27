import { TemplatePayloadMap } from "email/templates/template-payload.type";
import { SesTemplates } from "email/templates/templates.enums";
import { NotificationChannel } from "notification/enums/notification-channel.enum";

export class DispatchNotificationRequestDto<
  T extends SesTemplates = SesTemplates
> {
  userId: string;
  recipientEmail: string;
  title: string;
  message: string;
  templateId?: T; 
  metadata: TemplatePayloadMap[T]; 
  channels: NotificationChannel[];
}