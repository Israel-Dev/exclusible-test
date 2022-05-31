import axios from 'axios';
import { UserEndpoints } from '../endpoints';
import {
  GetLogoutFailedResponse,
  GetLogoutSuccessResponse,
  PostLoginFailedResponse,
  PostLoginParams,
  PostLoginSuccessResponse,
  PostRegisterFailedResponse,
  PostRegisterParams,
  PostRegisterSuccessResponse,
} from '../dtos/user.dto';
import Cookies from 'js-cookie';

const { REACT_APP_SERVER } = process.env;

const service = {
  registerUser: (
    params: PostRegisterParams,
  ): Promise<PostRegisterSuccessResponse | PostRegisterFailedResponse> =>
    new Promise((resolve, reject) => {
      axios
        .post(`${REACT_APP_SERVER}${UserEndpoints.register}`, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          console.error('Error in registerUserService', e);
          if (e && e.response && e.response.data && e.response.data) {
            reject(e.response.data);
          }
        });
    }),
  login: (params: PostLoginParams): Promise<PostLoginSuccessResponse | PostLoginFailedResponse> =>
    new Promise((resolve, reject) => {
      axios
        .post(`${REACT_APP_SERVER}${UserEndpoints.login}`, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          console.error('Erro in loginUserService', e);
          if (e && e.response && e.response.data) {
            reject(e.response.data);
          }
        });
    }),
  logout: (): Promise<GetLogoutSuccessResponse | GetLogoutFailedResponse> =>
    new Promise((resolve, reject) => {
      const authorization = Cookies.get('token');

      if (authorization) {
        axios
          .post(
            `${REACT_APP_SERVER}${UserEndpoints.logout}`,
            {},
            {
              headers: { authorization: `Bearer ${authorization}` },
            },
          )
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => {
            console.error('Error in logoutUserService', e);
            if (e && e.response && e.response.data) {
              reject(e.response.data);
            }
          });
      }
    }),
};

export default service;
