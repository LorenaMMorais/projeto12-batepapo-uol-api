import express from 'express';
import messagesRouter from './messagesRouter.js';
import participantsRouter from './participantsRouter.js';

const router = express.Router();

router.use(participantsRouter);
router.use(messagesRouter);


export default router;