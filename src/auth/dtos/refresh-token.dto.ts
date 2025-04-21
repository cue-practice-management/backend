
export class RefreshTokenRequestDto {
  refreshToken: string;
  deviceInfo: string;
  ip: string;
}

export class RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
