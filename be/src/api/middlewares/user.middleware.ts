import { Request, Response } from 'express';

export const mw = {
  hasAllFields: (req: Request, res: Response, next: () => void) => {
    const { username, email, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).send({ message: 'Not all fields were sent' });

    next();
  },
  hasCredentials: (req: Request, res: Response, next: () => void) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ message: 'Email or Password not sent' });

    next();
  }
};
