import axios from 'axios';
import Cookies from 'js-cookie';
import { MembersModel } from '../../models/member.model';
import {
  DeleteMembersFromTeamFailedResponse,
  DeleteMembersFromTeamParams,
  DeleteMembersFromTeamSuccessResponse,
  GetAddMembersParams,
  GetTeamMembersParams,
} from '../dtos/team.dto';
import { TeamEndpoints } from '../endpoints';
import { mapMemberResponseToModel } from '../mappers/member.mapper';

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
  getMembers: (dto: GetTeamMembersParams): Promise<MembersModel[]> =>
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
          .then((res) => {
            const mapedMembers = mapMemberResponseToModel(res.data);
            resolve(mapedMembers);
          })
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
  removeMembersFromTeam: (
    dto: DeleteMembersFromTeamParams,
  ): Promise<DeleteMembersFromTeamSuccessResponse | DeleteMembersFromTeamFailedResponse> =>
    new Promise((resolve, reject) => {
      const { memberIds, teamRef } = dto;
      const authorization = Cookies.get('token');

      if (authorization && REACT_APP_SERVER) {
        axios
          .delete(`${REACT_APP_SERVER}${TeamEndpoints.deleteMemberFromTeam}?teamRef=${teamRef}`, {
            data: {
              memberIds,
            },
            headers: {
              authorization: `Bearer ${authorization}`,
            },
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => {
            console.error('Error in teamService.removeMembersFromTeam', e);
            reject(e.data);
          });
      }
    }),
};

export default service;
