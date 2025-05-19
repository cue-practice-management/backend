// dtos/login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  deviceInfo: string;

  ip: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
