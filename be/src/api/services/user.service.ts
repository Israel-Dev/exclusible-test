import jwt from 'jsonwebtoken';
import { userModel } from '../models';

const { JWT_SECRET } = process.env;

export const service = {
  login: async (email: string, password: string) => {
    try {
      const users = await userModel.find({ email, password });
      console.log('users', users);

      if (users.length === 1) {
        const token = jwt.sign({ email }, JWT_SECRET as string);
        return token;
      }
    } catch (e) {
      console.error('Error in userService.login', e);
    }
  }
};
