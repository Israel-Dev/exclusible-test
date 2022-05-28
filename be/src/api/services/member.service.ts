import { memberModel } from '../models';
import { Member } from '../models/member.model';

export const service = {
  getMemberById: async (memberId: string) => {
    try {
      const member = await memberModel.findById(memberId);

      if (!member)
        return {
          status: 404,
          message: `A member with the id '${memberId}' was not found`
        };

      return member;
    } catch (e) {
      console.error('Error in memberService.getMemberById', e);
      return { status: 404, message: `A member with the id '${memberId}' was not found` };
    }
  },
  getMembersOfTeam: async (membersIds: string[]) => {
    try {
      const members = [];

      for (let i = 0; i < membersIds.length; i++) {
        const id = membersIds[i];
        const member = await memberModel.findById(id);

        members.push(member);
      }

      return members;
    } catch (e) {
      console.error('Error in memberService.getMembersOfTeam', e);
    }
  },
  createMember: async (member: Member) => {
    try {
      const newMember = await memberModel.create(member);

      return newMember;
    } catch (e) {
      console.error('Error in memberService.createMember', e);
    }
  }
};
