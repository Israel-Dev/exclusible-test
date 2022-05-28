import { teamModel } from '../models';

export const service = {
  getTeamByRef: async (teamRef: string) => {
    try {
      const teams = await teamModel.find({ teamRef });

      if (teams.length !== 1) return null;

      return teams[0];
    } catch (e) {
      console.error('Error in teamService', e);
    }
  },
  getTeamById: async (teamId: string) => {
    try {
      const team = await teamModel.findById(teamId);

      if (!team) return null;

      return team;
    } catch (e) {
      console.error('Error in teamService.getTeamById', e);
    }
  },
  addMemberToTeam: async (memberId: string, teamRef: string) => {
    try {
      const updatedTeam = await teamModel.findOneAndUpdate(
        { teamRef },
        { $push: { members: memberId } }
      );

      if (!updatedTeam) return null;

      return updatedTeam;
    } catch (e) {
      console.error('Error in teamService.addMemberTeam', e);
    }
  }
};