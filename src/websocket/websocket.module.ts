import { CommonModule } from '@common/common.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebSocketService } from './websocket.service';
import { NotificationGateway } from './gateways/notification.gateway';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [CommonModule],
            inject: [EnvironmentConfigService],
            useFactory: (env: EnvironmentConfigService) => ({
                secret: env.jwtAccessSecret,
                signOptions: {
                    expiresIn: env.jwtAccessExpiresIn,
                },
            }),
        })
    ],
    providers: [WebSocketService, NotificationGateway],
    exports: [WebSocketService, NotificationGateway],
})
export class WebsocketModule { }
