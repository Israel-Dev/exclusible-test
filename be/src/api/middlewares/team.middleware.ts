import { Request, Response } from 'express';

export const mw = {
  hasTeamRef: (req: Request, res: Response, next: () => void) => {
    const { teamRef } = req.query;

    if (!teamRef) return res.status(400).send({ message: 'teamRef was not sent in query' });

    next();
  }
};
