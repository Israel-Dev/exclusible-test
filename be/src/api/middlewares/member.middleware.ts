import { Request, Response } from 'express';

export const mw = {
  hasMemberId: (req: Request, res: Response, next: () => void) => {
    const { memberId } = req.body;

    if (!memberId) return res.status(400).send({ message: 'memberId was not sent' });
    next();
  },
  hasMemberIdInQuery: (req: Request, res: Response, next: () => void) => {
    const { memberId } = req.query;

    if (!memberId) return res.status(400).send({ message: 'memberId was not sent' });
    next();
  },
  onlyHaveValidFields: (req: Request, res: Response, next: () => void) => {
    const keys = Object.keys(req.body);

    const validKeys = ['name', 'email', 'dob', 'isMale', 'about'];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!validKeys.includes(key))
        return res.status(400).send({ message: `Invalid field '${key}' was sent on the request` });
    }

    next();
  },
  hasMemberIds: (req: Request, res: Response, next: () => void) => {
    const { memberIds } = req.body;

    if (!memberIds || !memberIds.length)
      return res.status(400).send({ message: 'No memberIds was not sent' });

    next();
  }
};
