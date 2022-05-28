import express from 'express';
import { userController } from '../controllers';
import { userMw } from '../middlewares';

const router = express.Router();

router.post('/register', userMw.hasAllFields, userController.register);

router.post('/login', userMw.hasCredentials, userController.login);

router.post('/logout', userMw.hasAuthorization, userMw.hasValidToken, userController.logout);

export default router;
