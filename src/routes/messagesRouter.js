import express from 'express';

import {setMessages, getMessages} from '../controllers/messagesController.js';

const messagesRouter = express.Router();
messagesRouter.post('/messages', setMessages);
messagesRouter.get('/messages', getMessages);

export default participantsRouter;