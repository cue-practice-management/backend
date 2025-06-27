import { Injectable } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailService } from 'email/email.service';
import { SesTemplates } from 'email/templates/templates.enums';
import { DispatchNotificationRequestDto } from 'notification/dtos/dispatch-notification-request.dto';
import { NotificationChannel } from 'notification/enums/notification-channel.enum';
import { WebSocketService } from 'websocket/websocket.service';

@Injectable()
export class NotificationDispatcherService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly wsService: WebSocketService,
    private readonly emailService: EmailService,
  ) {}

  async dispatch<T extends SesTemplates>(
    dto: DispatchNotificationRequestDto<T>,
  ): Promise<void> {
    const { userId, recipientEmail, title, message, templateId, metadata, channels } = dto;

    const notification = await this.notificationService.createNotification(userId, {
      title,
      message,
      metadata,
    });

    if (channels.includes(NotificationChannel.WEB_SOCKET)) {
      this.wsService.emitToUser(userId, 'notification', notification);
    }

    if (channels.includes(NotificationChannel.EMAIL) && templateId) {
      await this.emailService.sendEmail({
        to: recipientEmail,
        templateId,
        data: metadata,
      });
    }
  }
}