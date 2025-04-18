import { Global, Module } from '@nestjs/common';
import { AppLogger } from './loggers/app.logger';
import { EnvironmentConfigService } from './config/environment-config.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule],
    providers:[AppLogger, EnvironmentConfigService],
    exports:[AppLogger, EnvironmentConfigService],
})
export class CommonModule {}
