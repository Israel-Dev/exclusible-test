import express from 'express';
import { memberController } from '../controllers';
import { userMw } from '../middlewares';

const router = express.Router();

router.get('/allMembers', userMw.hasAuthorization, memberController.getMembers);

export default router;
