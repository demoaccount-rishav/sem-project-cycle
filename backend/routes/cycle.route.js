import express from 'express';
import { createCycle, deleteCycle, findCycle, updateCycleExitTime } from '../controllers/cycle.controller.js';

const cycleRouter = express.Router();

cycleRouter.post('/createcycle', createCycle);
cycleRouter.get('/findcycle', findCycle);
cycleRouter.delete('/deletecycle/:_id', deleteCycle);

cycleRouter.put('/:cycleId/update-exit', updateCycleExitTime);

export default cycleRouter;