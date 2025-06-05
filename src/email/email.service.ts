import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { SendEmailRequestDto } from './dtos/send-email-request.dto';
import { SesTemplates } from './templates/templates.enums';
import { EnvironmentConfigService } from '@common/config/environment-config.service';

@Injectable()
export class EmailService {
  private readonly ses: SESClient;
  private readonly logger = new Logger(EmailService.name);
  private readonly sourceEmail: string;

  constructor(private readonly env: EnvironmentConfigService) {
    this.ses = new SESClient({
      region: env.awsRegion,
      credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey,
      },
    });
    this.sourceEmail = env.sourceEmail;
  }

  async sendEmail<T extends SesTemplates>(
    dto: SendEmailRequestDto<T>,
  ): Promise<void> {
    const { to, templateId, data } = dto;

    const command = new SendTemplatedEmailCommand({
      Source: `CUE Practicas Universitarias <${this.sourceEmail}>`,
      Destination: {
        ToAddresses: [to],
      },
      Template: templateId,
      TemplateData: JSON.stringify(data),
    });

    try {
      const response = await this.ses.send(command);
      this.logger.log(
        `📧 Email (${templateId}) sent to ${to}: ${response.MessageId}`,
      );
    } catch (err) {
      this.logger.error(`❌ Error sending email (${templateId}) to ${to}`, err);
      throw err;
    }
  }
}
