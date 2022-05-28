import { Request, Response } from 'express';

export const controller = {
  getMembers: async (req: Request, res: Response) => {
    try {
      const { authorization, userEmail } = req.headers;

      res.send(`Member endpoint reached, your email is => ${userEmail}`);
    } catch (e) {
      console.error('Error in memberController', e);
    }
  }
};
