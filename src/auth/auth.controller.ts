import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login.dto';
import { RefreshTokenRequestDto } from './dtos/refresh-token.dto';
import { DEFAULTS, HEADERS } from './constants/auth.constants';
import { HeaderUtil } from '@common/utils/header.util';
import { RefreshCookieInterceptor } from './interceptors/refresh-cookie/refresh-cookie.interceptor';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { CookieUtil } from '@common/utils/cookie.util';
import { LogoutRequestDto } from './dtos/logout.dto';
import { RecoverPasswordRequestDto } from './dtos/recover-password-request.dto';
import { RecoverPasswordValidateRequestDto } from './dtos/recover-password-validate-reques.dto';
import { RecoverResetPasswordRequestDto } from './dtos/recover-reset-password-request.dto';

@UseInterceptors(RefreshCookieInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly env: EnvironmentConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    dto.deviceInfo = HeaderUtil.getHeaderStringValue(
      req.headers[HEADERS.USER_AGENT],
      DEFAULTS.UNKNOWN_DEVICE,
    );
    dto.ip = ip || DEFAULTS.UNKNOWN_IP;

    return await this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[this.env.jwtRefreshCookieName];

    if (refreshToken) {
      const dto = new LogoutRequestDto();
      dto.refreshToken = refreshToken;
      await this.authService.logout(dto);
    }
    CookieUtil.clearCookie(res, this.env.jwtRefreshCookieName);
    return res.status(HttpStatus.OK).send();
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@Req() req: Request, @Ip() ip: string) {
    const dto = new RefreshTokenRequestDto();

    dto.refreshToken = req.cookies[this.env.jwtRefreshCookieName];
    dto.deviceInfo = HeaderUtil.getHeaderStringValue(
      req.headers[HEADERS.USER_AGENT],
      DEFAULTS.UNKNOWN_DEVICE,
    );
    dto.ip = ip || DEFAULTS.UNKNOWN_IP;

    return await this.authService.refreshToken(dto);
  }

  @Post('recover-password')
  async recoverPassword(
    @Body() recoverPasswordRequestDto: RecoverPasswordRequestDto,
  ) {
    return await this.authService.recoverPassword(recoverPasswordRequestDto);
  }

  @Post('recover-password/validate')
  async validateRecoverPassword(
    @Body()
    recoverPasswordValidateRequestDto: RecoverPasswordValidateRequestDto,
  ) {
    return await this.authService.recoverPasswordValidate(
      recoverPasswordValidateRequestDto,
    );
  }

  @Post('recover-password/reset')
  async resetRecoverPassword(
    @Body() resetPasswordRequestDto: RecoverResetPasswordRequestDto,
  ) {
    return await this.authService.recoverResetPassword(resetPasswordRequestDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() userId: string) {
    return await this.authService.me(userId);
  }
}
