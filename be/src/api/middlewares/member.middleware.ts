import { Request, Response } from 'express';

export const mw = {
  hasMemberId: (req: Request, res: Response, next: () => void) => {
    const { memberId } = req.body;

    if (!memberId) return res.status(400).send({ message: 'memberId was not sent' });
    next();
  }
};
