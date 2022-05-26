import { Request, Response } from 'express';

export const mw = {
  hasCredentials: (req: Request, res: Response, next: () => void) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ message: 'Email or Password not sent' });

    next();
  }
};
