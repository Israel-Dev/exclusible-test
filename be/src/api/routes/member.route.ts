import express from 'express';
import { memberController } from '../controllers';
import { memberMw, userMw } from '../middlewares';

const router = express.Router();

router.get(
  '/getMember',
  memberMw.hasMemberIdInQuery,
  userMw.hasAuthorization,
  userMw.hasValidToken,
  memberController.getMember
);

router.post(
  '/createMember',
  userMw.hasAuthorization,
  userMw.hasValidToken,
  memberController.createMember
);

router.patch(
  '/updateMember',
  memberMw.hasMemberIdInQuery,
  memberMw.onlyHaveValidFields,
  userMw.hasAuthorization,
  userMw.hasValidToken,
  memberController.updateMember
);
//
export default router;
