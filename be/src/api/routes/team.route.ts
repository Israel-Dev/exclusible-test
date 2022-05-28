import express from 'express';
import { teamController } from '../controllers';
import { userMw, teamMw, memberMw } from '../middlewares';

const router = express.Router();

router.get('/myTeams', userMw.hasAuthorization, teamController.getTeams);

router.get('/allMembers', teamMw.hasTeamRef, userMw.hasAuthorization, teamController.getMembers);

router.post(
  '/addMember',
  teamMw.hasTeamRef,
  memberMw.hasMemberId,
  userMw.hasAuthorization,
  teamController.addMember
);

router.delete(
  '/deleteMember',
  teamMw.hasTeamRef,
  memberMw.hasMemberId,
  userMw.hasAuthorization,
  teamController.deleteMember
);

export default router;
