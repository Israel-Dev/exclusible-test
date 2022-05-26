import jwt from 'jsonwebtoken';
import { userModel } from '../models';
import bcrypt from 'bcrypt';

const { JWT_SECRET } = process.env;

export const service = {
  register: async (email: string, password: string, username: string) => {
    try {
      const isRegisteredUser = await userModel.find({ email });

      if (isRegisteredUser.length)
        return { status: 403, message: 'The user is already registered' };

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await userModel.create({ email, password: hashedPassword, username });

      return { status: 200, message: 'User created successfully', newUser };
    } catch (e) {
      console.error('Error in userService.register:', e);
    }
  },
  login: async (email: string, password: string) => {
    try {
      const users = await userModel.find({ email });

      if (users.length !== 1) return null;

      const isSame = await bcrypt.compare(password, users[0].password);

      if (!isSame) return null;

      const token = jwt.sign({ email }, JWT_SECRET as string);
      return token;
    } catch (e) {
      console.error('Error in userService.login:', e);
    }
  }
};
