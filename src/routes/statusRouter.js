import express from 'express';
import { setStatus } from '../controllers/statusController.js';

const statusRouter = express.Router();
statusRouter.post('/status', setStatus);

export default statusRouter;