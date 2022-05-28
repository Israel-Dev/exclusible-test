import { Request, Response } from 'express';
import { RedisClient } from '../../db';
import { userService } from '../services';
import { RedisKeys } from '../types/redis';

export const controller = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      const operationData = await userService.register(email, password, username);

      if (operationData && !operationData.newUser)
        return res.status(operationData.status).send({ message: operationData.message });

      if (operationData) {
        return res.status(operationData.status).send({
          message: operationData.message,
          token: operationData.token
        });
      }

      res.status(400).send();
    } catch (e) {
      console.error('Error in userController.register:', e);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const token = await userService.login(email, password);

      if (!token) return res.status(400).send({ message: 'Your email/password is incorrect' });

      res.send({ token, message: "You're logged in" });
    } catch (e) {
      console.error('Error in userController.login', e);
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      const { authorization, userEmail } = req.headers;

      const operationData = await userService.logout(userEmail as string, authorization as string);

      if (!operationData) return res.status(400).send({ message: 'Your operation failed' });

      res.status(operationData.status).send({ message: operationData.message });
    } catch (e) {
      console.error('Error in userController.logout', e);
    }
  },
  logoutAll: async (req: Request, res: Response) => {
    try {
      const { authorization, userId } = req.headers;

      const numberOfDeletedTokens = await RedisClient.DEL(`${RedisKeys.Token}${userId}`);

      if (numberOfDeletedTokens) {
        return res.status(202).send({ message: `You terminated all your sessions` });
      }

      res.status(409).send({ message: 'Unable to end your sessions' });
    } catch (e) {
      console.error('Error in userController.logoutAll', e);
    }
  }
};
