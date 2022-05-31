import axios from 'axios';
import Cookies from 'js-cookie';
import { GetAddMembersParams, GetTeamMembersParams } from '../dtos/team.dto';
import { TeamEndpoints } from '../endpoints';

const { REACT_APP_SERVER } = process.env;

const service = {
  getMyTeams: (): Promise<string[]> =>
    new Promise((resolve, reject) => {
      const authorization = Cookies.get('token');

      if (REACT_APP_SERVER && authorization) {
        axios
          .get(`${REACT_APP_SERVER}${TeamEndpoints.myTeams}`, {
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => {
            console.error('Error in teamService.getMyTeams', e);
            reject(e);
          });
      }
    }),
  getMembers: (dto: GetTeamMembersParams) =>
    new Promise((resolve, reject) => {
      const authorization = Cookies.get('token');
      const { teamRef } = dto;

      if (REACT_APP_SERVER && authorization && teamRef) {
        axios
          .get(`${REACT_APP_SERVER}${TeamEndpoints.allMembers}?teamRef=${teamRef}`, {
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => resolve(res.data))
          .catch((e) => {
            console.error('Error in teamService.getMembers', e);
            reject(e.data);
          });
      }
    }),
  addMember: (dto: GetAddMembersParams) =>
    new Promise((resolve, reject) => {
      const { teamRef, memberId } = dto;
      const authorization = Cookies.get('token');

      if (REACT_APP_SERVER && authorization)
        axios
          .post(
            `${REACT_APP_SERVER}${TeamEndpoints.addMember}?teamRef=${teamRef}`,
            { memberId },
            { headers: { authorization: `Bearer ${authorization}` } },
          )
          .then((res) => resolve(res.data))
          .catch((e) => {
            console.error('Error in teamService.addMember', e);
            reject(e.data);
          });
    }),
};

export default service;
