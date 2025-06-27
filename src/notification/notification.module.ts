import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { EmailModule } from 'email/email.module';
import { NotificationService } from './services/notification.service';
import { NotificationDispatcherService } from './services/notification-dispatcher.service';
import { WebsocketModule } from 'websocket/websocket.module';
import { NotificationStrategyRegistry } from './strategies/registry/notification-strategy.registry';
import { NotificationListener } from './listeners/notification.listener';
import { NOTIFICATION_STRATEGIES } from './strategies/notifification-strategy.constants';
import { NotificationStrategy } from './strategies/notification-strategy.interface';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    EmailModule,
    WebsocketModule,
  ],
  providers: [
    ...NOTIFICATION_STRATEGIES,
    {
      provide: 'NOTIFICATION_STRATEGIES',
      useFactory: (...strategies: NotificationStrategy[]) => strategies,
      inject: [...NOTIFICATION_STRATEGIES],
    },
    {
      provide: NotificationStrategyRegistry,
      useFactory: (strategies: NotificationStrategy[]) =>
        new NotificationStrategyRegistry(strategies),
      inject: ['NOTIFICATION_STRATEGIES'],
    },
    NotificationDispatcherService,
    NotificationService,
    NotificationListener,
  ],
})
export class NotificationModule {}

