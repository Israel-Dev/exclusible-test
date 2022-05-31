import { Request, Response } from 'express';
import { memberService } from '../services';

export const controller = {
  getMember: async (req: Request, res: Response) => {
    try {
      const { memberId } = req.query;

      const member = await memberService.getMemberById(memberId as string);
      res.send(member);
    } catch (e) {
      console.error('Error in memberController.getMember', e);
      res.status(500).send({ message: `Unable to retrive the member ${req.query.memberId}` });
    }
  },
  createMember: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const newMember = await memberService.createMember(body);

      if (!newMember) return res.status(409).send({ message: 'Unable to create a new member' });

      res.status(201).send({ message: 'The member was created', memberId: newMember.id });
    } catch (e) {
      console.error('Error in memberController.createMember', e);
    }
  },
  updateMember: async (req: Request, res: Response) => {
    try {
      const { memberId } = req.query;

      if (memberId) {
        await memberService.updateMember(memberId as string, req.body);
        return res.status(202).send({ message: `The member with id '${memberId}' was updated` });
      }
      res.status(409).send({ message: `Unable to update the user with id '${memberId}'` });
    } catch (e) {
      console.error('Error in memberController.updateMember', e);
      res.status(500).send({ message: 'Unable to update member' });
    }
  }
};
