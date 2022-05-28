import { memberModel } from '../models';

export const service = {
  // getTeam: async (teamRef: string) => {
  //   try {
  //     //   const user = ((await userService.getUser(email)) as Array<User>)[0];
  //     //   const userId = user.id;
  //     const team = await teamService.getTeamByRef(teamRef);
  //     if (!team) return null;
  //     return team;
  //     //   console.log('team', team);
  //     //   console.log('user', user);
  //     //   const redisKey = `${RedisKeys.Token}${userId}`;
  //     //   const validTokens = await RedisClient.SMEMBERS(redisKey);
  //     //   const numberOFawait RedisClient.SREM(token)
  //   } catch (e) {
  //     console.error('Error in memberService', e);
  //   }
  // }
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
  }
};
