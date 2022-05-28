import express from 'express';
import { teamController } from '../controllers';
import { userMw, teamMw } from '../middlewares';

const router = express.Router();

router.get('/myTeams', userMw.hasAuthorization, teamController.getTeams);
router.get('/allMembers', teamMw.hasTeamRef, userMw.hasAuthorization, teamController.getMembers);

export default router;
