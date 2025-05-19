export const EXCEPTION_CODES = {
  OTP_INVALID: 'OTP_INVALID',
  OTP_CREATE_TOO_SOON: 'OTP_CREATE_TOO_SOON',
  OTP_ATTEMPTS_EXCEEDED: 'OTP_ATTEMPTS_EXCEEDED',
  OTP_EXPIRED: 'OTP_EXPIRED',
};

export const EXCEPTION_MESSAGES = {
  OTP_INVALID: 'The OTP code is invalid.',
  OTP_CREATE_TOO_SOON: 'You have to wait until you ask for another OTP.',
  OTP_ATTEMPTS_EXCEEDED:
    'You have exceeded the maximum number of attempts. Please try again later.',
  OTP_EXPIRED: 'The OTP code has expired.',
};

export const OTP_CODE_LENGTH = 6;

export const OTP_CODE_EXPIRATION_MINUTES = 5;

export const OTP_RESEND_INTERVAL_MS = 2 * 60 * 1000;

export const OTP_MAX_ATTEMPTS = 5;
