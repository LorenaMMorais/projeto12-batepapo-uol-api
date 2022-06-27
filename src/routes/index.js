import express from 'express';
import messagesRouter from './messagesRouter.js';
import participantsRouter from './participantsRouter.js';
import statusRouter from './statusRouter.js';

const router = express.Router();

router.use(participantsRouter);
router.use(messagesRouter);
router.use(statusRouter);

export default router;