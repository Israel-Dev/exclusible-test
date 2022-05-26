import { Request, Response } from 'express';
import { userService } from '../services';

export const controller = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const token = await userService.login(email, password);

      if (token) {
        res.send({ token, message: "You're logged in" });
      }
    } catch (e) {
      console.error('Error in userController.login', e);
    }
  }
};
