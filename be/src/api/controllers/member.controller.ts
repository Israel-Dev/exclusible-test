import { Request, Response } from 'express';
import { memberService } from '../services';

export const controller = {
  createMember: async (req: Request, res: Response) => {
    try {
      const { body } = req;

      const newMember = await memberService.createMember(body);

      if (!newMember) return res.status(409).send({ message: 'Unable to create a new member' });

      res.status(201).send({ message: 'The member was created', memberId: newMember.id });
    } catch (e) {
      console.error('Error in memberController.createMember', e);
    }
  }
};
