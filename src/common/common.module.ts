import { Global, Module } from '@nestjs/common';
import { AppLogger } from './loggers/app.logger';

@Global()
@Module({
    providers:[AppLogger],
    exports:[AppLogger],
})
export class CommonModule {}
