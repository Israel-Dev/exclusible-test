import axios from 'axios';
import Cookies from 'js-cookie';
import { MembersModel } from '../../models/member.model';
import {
  GetMemberParams,
  PatchUpdateMemberParams,
  PatchUpdateMemberSuccessResponse,
  PostCreateMemberFailedResponse,
  PostCreateMemberParams,
  PostCreateMemberSuccessResponse,
} from '../dtos/member.dto';
import { MemberEndpoints } from '../endpoints/member.endpoint';
import { mapMemberResponseToModelNoDateFormat } from '../mappers/member.mapper';

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
  getMember: (dto: GetMemberParams): Promise<MembersModel> =>
    new Promise((resolve, reject) => {
      const { memberId } = dto;
      const authorization = Cookies.get('token');

      if (REACT_APP_SERVER && authorization && memberId) {
        axios
          .get(`${REACT_APP_SERVER}${MemberEndpoints.getMember}?memberId=${memberId}`, {
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => {
            resolve(mapMemberResponseToModelNoDateFormat([res.data])[0]);
          })
          .catch((e) => {
            console.error('Error in memberService.getMember', e);
            reject(e.data);
          });
      }
    }),
  updateMember: (
    dto: PatchUpdateMemberParams,
    memberId: string,
  ): Promise<PatchUpdateMemberSuccessResponse> =>
    new Promise((resolve, reject) => {
      const authorization = Cookies.get('token');

      if (authorization && REACT_APP_SERVER) {
        axios
          .patch(`${REACT_APP_SERVER}${MemberEndpoints.updateMember}?memberId=${memberId}`, dto, {
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => {
            console.error('Error in memberService.updateMember', e);
            reject(e);
          });
      }
    }),
};

export default service;
