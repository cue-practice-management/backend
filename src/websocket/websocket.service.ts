import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';

@Injectable()
export class WebSocketService {
  constructor(private readonly gateway: NotificationGateway) { }

  emitToUser(userId: string, event: string, payload: any): void {
    this.gateway.emitToUser(userId, event, payload);
  }
}