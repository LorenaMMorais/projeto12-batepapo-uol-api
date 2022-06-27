import express from 'express';

import {getParticipants, setParticipants} from '../controllers/participantsController.js';

const participantsRouter = express.Router();

participantsRouter.post('/participants', setParticipants);
participantsRouter.get('/participants', getParticipants);

export default participantsRouter;