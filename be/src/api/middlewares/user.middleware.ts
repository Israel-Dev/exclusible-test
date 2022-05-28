import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RedisClient } from '../../db';
import { userService } from '../services';
import { RedisKeys } from '../types/redis';

const { JWT_SECRET } = process.env;

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

    if (JWT_SECRET) {
      jwt.verify(req.headers.authorization, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error('Error in userMiddleware.hasAuthorization', err);
          return res.status(401).send({ message: 'Invalid sign in' });
        }
        req.headers.userEmail = (decoded as JwtPayload).email;
        next();
      });
    }
  },
  hasValidToken: async (req: Request, res: Response, next: () => void) => {
    try {
      const { authorization } = req.headers;
      const { userEmail } = req.headers;

      const userId = (await userService.getUser(userEmail as string))?.id;

      if (!userId) return res.status(404).send({ message: 'Your user was not found' });

      req.headers.userId = userId;

      const isValidToken = await RedisClient.SISMEMBER(
        `${RedisKeys.Token}${userId}`,
        authorization as string
      );

      if (!isValidToken) return res.status(401).send({ message: 'Your session is invalid' });
      next();
    } catch (e) {
      console.error('Error in userMiddleware', e);
      res.status(401).send({ message: 'Your token is invalid' });
    }
  },
  hasEmail: (req: Request, res: Response, next: () => void) => {
    const { email } = req.body;

    if (!email) return res.status(400).send({ message: 'No email was sent in the request' });
    next();
  }
};
