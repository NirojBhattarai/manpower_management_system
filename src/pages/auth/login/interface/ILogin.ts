// success response
export interface ILoginSuccess {
  data: {
    user: IUser;
    refreshToken: string;
    accessToken: string;
  };
  message: string;
  status: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone_No: string;
  avatar: string | null;
  tenantId: string;
}

// Error Response
export interface ILoginError {
  data: {
    message: string;
    success: boolean;
  };
}
