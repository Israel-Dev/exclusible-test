import e from 'express';
import express from 'express';
import { memberController } from '../controllers';
import { userMw } from '../middlewares';

const router = express.Router();

router.post('/createMember', userMw.hasAuthorization, memberController.createMember);

export default router;
