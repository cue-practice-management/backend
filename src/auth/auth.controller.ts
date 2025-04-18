import { Request } from 'express';
import { Body, Controller, Ip, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login.dto';
import { RefreshTokenRequestDto } from './dtos/refresh-token.dto';
import { DEFAULTS, HEADERS } from './constants/auth.constants';
import { HeaderUtil } from '@common/utils/header.util';
import { RefreshCookieInterceptor } from './interceptors/refresh-cookie/refresh-cookie.interceptor';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@UseInterceptors(RefreshCookieInterceptor)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly env: EnvironmentConfigService) { }

    @Post('login')
    async login(@Body() dto: LoginRequestDto, @Req() req: Request, @Ip() ip: string) {
        dto.deviceInfo = HeaderUtil.getHeaderStringValue(req.headers[HEADERS.USER_AGENT], DEFAULTS.UNKNOWN_DEVICE);
        dto.ip = ip || DEFAULTS.UNKNOWN_IP;

        return await this.authService.login(dto);
    }

    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    async refresh(@Req() req: Request, @Ip() ip: string) {
        const dto = new RefreshTokenRequestDto();

        dto.refreshToken = req.cookies[this.env.jwtRefreshCookieName];
        dto.deviceInfo = HeaderUtil.getHeaderStringValue(req.headers[HEADERS.USER_AGENT], DEFAULTS.UNKNOWN_DEVICE);
        dto.ip = ip || DEFAULTS.UNKNOWN_IP;

        return await this.authService.refreshToken(dto);
    }
}
