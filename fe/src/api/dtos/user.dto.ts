export interface PostLoginParams {
  email: string;
  password: string;
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
