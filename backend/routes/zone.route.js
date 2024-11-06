import express from 'express';
import { createZone, findZone, updateZone } from '../controllers/zone.controller.js';

const zoneRouter = express.Router();

zoneRouter.post('/createzone', createZone);
zoneRouter.get('/findzone', findZone);
zoneRouter.put('/updatezone/', updateZone);
// zoneRouter.delete('/deleteuser/:id', deleteUser);

export default zoneRouter;