import { ExecutionContext, Injectable } from '@nestjs/common';
import { seconds, ThrottlerLimitDetail, ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';
import { EnvironmentConfigService } from '@common/config/environment-config.service';

@Injectable()
export class ThrottleConfigService implements ThrottlerOptionsFactory {
    constructor(private readonly env: EnvironmentConfigService) { }

    createThrottlerOptions(): ThrottlerModuleOptions {
        return {
            throttlers: [
                {
                    ttl: seconds(this.env.throttleTtl),
                    limit: this.env.throttleLimit,
                    getTracker: (req: Record<string, any>) => {
                        if (req.userId) {
                            return req.userId;
                        }
                        return req.ip;
                    },
                },
            ],
            errorMessage: (context: ExecutionContext, detail: ThrottlerLimitDetail) => {
                return `Too many requests. Please try again later.`;
            }
        };
    }
}
