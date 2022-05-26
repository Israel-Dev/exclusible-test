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
  },
  hasAuthorization: (req: Request, res: Response, next: () => void) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'You are not authenticated' });

    req.headers.authorization = authorization.split(' ')[1];

    next();
  },
  hasEmail: (req: Request, res: Response, next: () => void) => {
    const { email } = req.body;

    if (!email) return res.status(400).send({ message: 'No email was sent in the request' });
    next();
  }
  // isLoggedIn: (req: Request, res: Response, next: () => void) => {
  //   const { authorization } = req.headers;

  //   console.log('authorization', authorization);
  //   next();
  // }
};
