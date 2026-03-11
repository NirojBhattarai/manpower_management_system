import Cookies from "js-cookie";

/**
 * Sets a cookie with a specified name, value, and optional expiration time.
 */
export const setCookie = ({
  cookieName,
  value,
  expiresIn,
}: {
  cookieName: string;
  value: string;
  expiresIn?: number;
}) => {
  Cookies.set(cookieName, value, { expires: expiresIn });
};

/**
 * Removes a specific cookie by name.
 */
export const removeCookie = (cookieName: string) => Cookies.remove(cookieName);

/**
 * Retrieves the value of a specific cookie by name.

 */
export const getCookie = (cookieName: string) => Cookies.get(cookieName);

/**
 * Clears all authentication-related cookies.
 * Currently removes 'accessToken' and 'refreshToken'.
 */
export const clearAllCookies = () => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
};
