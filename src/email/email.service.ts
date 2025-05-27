import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { SendEmailRequestDto } from './dtos/send-email-request.dto';
import { Personalization } from 'mailersend/lib/modules/Email.module';

@Injectable()
export class EmailService {
  private readonly mailerSend: MailerSend;
  private readonly sentFrom: Sender;

  constructor(private readonly env: EnvironmentConfigService) {
    this.mailerSend = new MailerSend({
      apiKey: this.env.mailersendApiKey,
    });
    this.sentFrom = new Sender(
      this.env.mailersendSenderName,
      this.env.mailersendSenderEmail,
    );
  }

  async sendEmail(sendEmailRequestDto: SendEmailRequestDto): Promise<void> {
    const { to, subject, templateId, variables } = sendEmailRequestDto;

    const recipients: Recipient[] = [new Recipient(to)];
    const personalization: Personalization[] = [
      {
        email: to,
        data: variables,
      },
    ];

    const emailParams: EmailParams = new EmailParams()
      .setFrom(this.sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setTemplateId(templateId)
      .setPersonalization(personalization);

    console.log('Sending email with params:', emailParams);

    await this.mailerSend.email.send(emailParams);
  }
}
