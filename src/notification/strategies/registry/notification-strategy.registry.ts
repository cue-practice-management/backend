
import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../notification-strategy.interface';

@Injectable()
export class NotificationStrategyRegistry {
    constructor(
        private readonly strategies: NotificationStrategy[],
    ) { }

    getStrategyFor(event: any): NotificationStrategy | undefined {
        return this.strategies.find((strategy) => strategy.supports(event));
    }
}