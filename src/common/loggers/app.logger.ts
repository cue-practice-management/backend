// src/common/logger/app.logger.ts
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends Logger {
  log(message: string, context?: string) {
    super.log(message, context || this.context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context || this.context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context || this.context);
  }
}
