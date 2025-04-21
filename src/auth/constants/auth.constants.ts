export const EXCEPTION_CODES = {
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  INVALID_REFRESH_TOKEN: 'AUTH_INVALID_REFRESH_TOKEN',
  USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  ACCOUNT_DISABLED: 'AUTH_ACCOUNT_DISABLED',
};

export const EXCEPTION_MESSAGES = {
  INVALID_CREDENTIALS: 'Email or password is incorrect',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
  USER_NOT_FOUND: 'User not found',
  ACCOUNT_DISABLED: 'Account is disabled',
};

export const HEADERS = {
  USER_AGENT: 'user-agent',
}

export const DEFAULTS = {
  UNKNOWN_DEVICE: 'unknown-device',
  UNKNOWN_IP: 'unknown-ip',
}

export const REFRESH_TOKEN_COOKIE = 'refreshToken';