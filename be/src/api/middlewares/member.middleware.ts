import { Request, Response } from 'express';

export const mw = {
  hasMemberId: (req: Request, res: Response, next: () => void) => {
    const { memberId } = req.body;

    if (!memberId) return res.status(400).send({ message: 'memberId was not sent' });
    next();
  },
  hasMemberIds: (req: Request, res: Response, next: () => void) => {
    const { memberIds } = req.body;

    if (!memberIds || !memberIds.length)
      return res.status(400).send({ message: 'No memberIds was not sent' });

    next();
  }
};
