import express from 'express';
import { userController } from '../controllers';
import { userMw } from '../middlewares';

const router = express.Router();

router.post('/register', () => {});

router.post('/login', userMw.hasCredentials, userController.login);

router.post('/logout', (req, res) => {
  res.send('You have logged out');
});

export default router;
