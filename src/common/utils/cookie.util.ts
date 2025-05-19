import { Response } from 'express';
import { CommonUtil } from './common.util';

export interface CookieOptions {
  name: string;
  value: string;
  maxAgeInDays?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

function setCookie(response: Response, options: CookieOptions) {
  const {
    name,
    value,
    maxAgeInDays = 1,
    httpOnly = true,
    secure = false,
    sameSite = 'lax',
    path = '/',
  } = options;
  const maxAgeInMilliseconds = CommonUtil.fromDaysToMilliseconds(maxAgeInDays);

  response.cookie(name, value, {
    maxAge: maxAgeInMilliseconds,
    httpOnly,
    secure,
    sameSite,
    path,
  });
}

function clearCookie(response: Response, name: string) {
  response.clearCookie(name);
}

export const CookieUtil = {
  setCookie,
  clearCookie,
};
