import express from 'express';
import { teamController } from '../controllers';
import { userMw, teamMw } from '../middlewares';

const router = express.Router();

router.get('/myTeams', userMw.hasAuthorization, teamController.getTeams);
router.get('/allMembers', teamMw.hasTeamRef, userMw.hasAuthorization, teamController.getMembers);
router.post('/addMember', teamMw.hasTeamRef, userMw.hasAuthorization, teamController.addMember);

export default router;