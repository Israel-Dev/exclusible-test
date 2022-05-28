import { Request, Response } from 'express';
import { memberModel, teamModel } from '../models';
import { Member } from '../models/member.model';
import { memberService, teamService, userService } from '../services';

export const controller = {
  getTeams: async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.headers;
      const user = await userService.getUser(userEmail as string);

      if (!user) return res.status(400).send({ message: 'User not found' });

      const teamRefsArr = [];

      for (let i = 0; i < user.teams.length; i++) {
        const team = user.teams[i];

        const teamRef = (await teamService.getTeamById(team))?.teamRef;

        teamRefsArr.push(teamRef);
      }

      res.status(200).send(teamRefsArr);
    } catch (e) {
      console.error('Error in teamController.getTeam', e);
    }
  },
  getMembers: async (req: Request, res: Response) => {
    try {
      const { teamRef } = req.query;

      const team = await teamService.getTeamByRef(teamRef as string);

      if (!team) {
        return res.status(404).send({ message: 'Team not found' });
      }

      const members = await memberService.getMembersOfTeam(team.members);

      if (!members) return res.status(404).send({ message: 'No members were found' });

      res.status(200).send(members);
    } catch (e) {
      console.error('Error in memberController', e);
    }
  },
  addMember: async (req: Request, res: Response) => {
    try {
      const { teamRef } = req.query;
      const { memberId } = req.body;

      const member = await memberService.getMemberById(memberId);

      if (member && (member as { status: number }).status)
        return res
          .status((member as { status: number }).status)
          .send({ message: (member as { message: string }).message });

      const team = await teamService.getTeamByRef(teamRef as string);

      if (!team) return res.status(400).send({ message: `The team ${teamRef} was not found` });

      if (team.members.find((id) => id === memberId))
        return res.status(409).send({
          message: `The member with id '${memberId}' is already in the team '${teamRef}'`
        });

      await teamService.addMemberToTeam(memberId as string, teamRef as string);

      res.status(200).send({ message: `Member added to the team: ${teamRef}` });
    } catch (e) {
      console.error('Error in teamController.addMember', e);
    }
  },
  deleteMember: async (req: Request, res: Response) => {
    try {
      const { teamRef } = req.query;
      const { memberId } = req.body;

      const updatedMembers = await teamService.deleteTeamMember(
        memberId as string,
        teamRef as string
      );

      if (updatedMembers && (updatedMembers as { status: number; message: string }).status) {
        return res.status((updatedMembers as { status: number; message: string }).status).send({
          message: (updatedMembers as { status: number; message: string }).message
        });
      }
      if (!updatedMembers) return res.status(406).send({ message: 'Unable to delete member' });

      res.status(202).send({ message: 'Member was deleted' });
    } catch (e) {
      console.error('Error in teamController.deleteMember', e);
    }
  }
};
