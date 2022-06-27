import express from 'express';

import {setParticipants} from '../controllers/participantsController.js';

const participantsRouter = express.Router();

participantsRouter.post('/participants', setParticipants);

export default participantsRouter;