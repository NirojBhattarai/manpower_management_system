import { Cookies } from "react-cookie";
export const COOKIE_CONFIG = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  tenantId: "tenantId",
  accessTokenExpiryDuration: 1,
  refreshTokenExpiryDuration: 24 * 7,
};

interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  partitioned?: boolean;
}

const cookie = new Cookies();

export const setCookie = ({
  cookieName,
  value,
  expiresIn,
  options,
}: {
  cookieName: string;
  value: string;
  expiresIn?: number;
  options?: CookieSetOptions;
}) => {
  if (!expiresIn) {
    cookie.set(cookieName, value);
    return;
  }
  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + expiresIn * 60 * 60 * 1000);
  cookie.set(cookieName, value, {
    expires: expiresDate,
    path: "/",
    ...options,
  });
};

export const removeCookie = (cookieName: string) =>
  cookie.remove(cookieName, { path: "/" });

export const getCookie = (cookieName: string) => cookie.get(cookieName);

export const clearAllCookies = () => {
  removeCookie(COOKIE_CONFIG.accessToken);
  removeCookie(COOKIE_CONFIG.refreshToken);
  removeCookie(COOKIE_CONFIG.tenantId);
  localStorage.clear();
};
