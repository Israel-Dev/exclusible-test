export interface PostLoginParams {
  email: string;
  password: string;
}

export interface PostLoginSuccessResponse {
  token: string;
  message: string;
}

export interface PostLoginFailedResponse {
  message: string;
}

export interface PostRegisterParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface PostRegisterSuccessResponse {
  message: string;
  token: string;
}

export interface PostRegisterFailedResponse {
  message: string;
}

export interface GetLogoutSuccessResponse {
  message: string;
}

export interface GetLogoutFailedResponse {
  message: string;
}

export interface GetLogoutEveryWhereSuccessResponse {
  message: string;
}
