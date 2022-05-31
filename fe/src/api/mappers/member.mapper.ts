import { MembersModel } from '../../models/member.model';
import { GetTeamMembersSuccessResponse } from '../dtos/team.dto';

export const mapMemberResponseToModel = (dto: GetTeamMembersSuccessResponse[]): MembersModel[] =>
  dto.map((member) => ({
    ...member,
    gender: member.isMale ? 'male' : 'female',
    dob: new Date(member.dob).toLocaleDateString('en-uk'),
  }));
