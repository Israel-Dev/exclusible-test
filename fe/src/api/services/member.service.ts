import axios from 'axios';
import Cookies from 'js-cookie';
import {
  PostCreateMemberFailedResponse,
  PostCreateMemberParams,
  PostCreateMemberSuccessResponse,
} from '../dtos/member.dto';
import { MemberEndpoints } from '../endpoints/member.endpoint';

const { REACT_APP_SERVER } = process.env;

const service = {
  createMember: (
    dto: PostCreateMemberParams,
  ): Promise<PostCreateMemberSuccessResponse | PostCreateMemberFailedResponse> =>
    new Promise((resolve, reject) => {
      const authorization = Cookies.get('token');
      if (REACT_APP_SERVER && authorization) {
        axios
          .post(`${REACT_APP_SERVER}${MemberEndpoints.createMember}`, dto, {
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => resolve(res.data))
          .catch((e) => {
            console.error('Error in memberService.createMember', e);
            reject(e.data);
          });
      }
    }),
};

export default service;
