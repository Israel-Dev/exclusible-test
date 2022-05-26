import { Request, Response } from 'express';
import { userService } from '../services';

export const controller = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      const newUser = await userService.register(email, password, username);

      if (newUser) {
        return res.status(201).send({ message: 'New user created', newUser });
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
  }
};
