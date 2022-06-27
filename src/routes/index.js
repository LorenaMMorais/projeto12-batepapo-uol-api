import express from 'express';
import participantsRouter from './participantsRouter.js';

const router = express.Router();

router.use(participantsRouter);

export default router;