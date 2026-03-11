import { jwtDecode, InvalidTokenError } from "jwt-decode";

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  roleId: string;
  iat: number;
  exp: number;
  roleCode: string;
};

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return false;
    }
  }
};
