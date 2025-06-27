import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationStrategyRegistry } from 'notification/strategies/registry/notification-strategy.registry';

@Injectable()
export class NotificationListener {
    private readonly logger = new Logger(NotificationListener.name);

    constructor(
        private readonly registry: NotificationStrategyRegistry,
    ) { }

    @OnEvent('*', { async: true })
    async handle(event: any, eventName: string) {
        const strategy = this.registry.getStrategyFor(event);

        if (!strategy) {
            this.logger.debug(`No hay estrategia registrada para: ${eventName}`);
            return;
        }

        this.logger.log(`Ejecutando estrategia para: ${eventName}`);
        await strategy.execute(event);
    }
}