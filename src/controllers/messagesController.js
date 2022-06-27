import db from '../db.js';
import joi from 'joi';
import dayjs from 'dayjs';

export async function setMessages(req, res){
    const {to, text, type} = req.body;
    console.log('corpo da mensagem', to, text, type);
    const user = req.headers.user;
    const message = {
        from: user,
        to,
        text,
        type,
        time: dayjs().format('HH:MM:SS')
    };
    const schema = joi.object({
        from: joi.string().required(),
        to: joi.string().required(),
        text: joi.string().required(),
        type: joi.string().required(),
        time: joi.string().required() 
    });
    const validation = schema.validate(message);
    const validateType = (type === 'message' || type === 'private_message');
    if(validation.error || !validateType){
        console.log('Tipo inválido');
        res.status(422).send('Tipo de mensagem inválido!');
        return;
    }

    try{
        const checkUser = await db.collection('participants').findOne({name: user});
        if(!checkUser){
            res.status(422).send('Usuário não encontrado!');
            console.log('Usuário não encontrado!');
            return;
        }
        await db.collection('messages').insertOne(message);
        console.log(message);
        res.status(201);
    }catch{
        res.status(422).send('Não foi possível enviar a mensagem!');
    }
}

export async function getMessages(req, res){
    const user = req.headers.user;
    const limit = parseInt(req.query.limit);
    console.log(limit);

    try{
        const showMessages = await db.collection('messages').find({$or:[{to: 'Todos'}, {from: user}, {to: user}]}).toArray();
        console.log(showMessages);
        limit ? res.send(showMessages.slice(- limit)) : res.send(showMessages);
    }catch(er){
        console.log('Erro ao buscar mensagem');
        res.send('Erro ao buscar mensagem' + er);
    }
}