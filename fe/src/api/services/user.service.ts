import axios from 'axios';
import {
  PostRegisterFailedResponse,
  PostRegisterParams,
  PostRegisterSuccessResponse,
} from '../dtos/user.dto';
import { UserEndpoints } from '../endpoints';

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
};

export default service;
