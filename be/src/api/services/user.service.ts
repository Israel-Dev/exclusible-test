import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models';
import { RedisClient } from '../../db';
import { RedisEnums } from '../types';

const { RedisKeys } = RedisEnums;
const { JWT_SECRET } = process.env;

export const service = {
  register: async (email: string, password: string, username: string) => {
    try {
      const isRegisteredUser = await userModel.find({ email });

      if (isRegisteredUser.length)
        return { status: 403, message: 'The user is already registered' };

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await userModel.create({
        email,
        password: hashedPassword,
        username,
        teams: []
      });

      const token = await service.login(email, password);
      return { status: 201, message: 'User created successfully', newUser, token };
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

      const userId = users[0].id;
      const redisKey = `${RedisKeys.Token}${userId}`;
      await RedisClient.SADD(redisKey, token);
      return token;
    } catch (e) {
      console.error('Error in userService.login:', e);
    }
  },
  logout: async (email: string, token: string) => {
    try {
      const users = await userModel.find({ email });

      if (users.length !== 1) return { status: 409, message: 'Unable to find your user' };

      const userId = users[0].id;

      const numberOfItemsDeleted = await RedisClient.SREM(`${RedisKeys.Token}${userId}`, token);

      if (numberOfItemsDeleted) return { status: 200, message: 'You logged out successfully' };

      return { status: 400, message: 'The operation you tried to perform failed' };
    } catch (e) {
      console.error('Error in userService.isUserLogged', e);
    }
  }
};
