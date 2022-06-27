import db from '../db.js';
import joi from 'joi';
import dayjs from 'dayjs';

export async function setParticipants(req, res){
    const body = req.body;

    const participant = {
        name: body.name,
        lastStatus: Date.now()
    };

    const schema = joi.object({
        name: joi.string().required()
    });
    const validation = schema.validate(body);
    if(validation.error){
        console.log('Erro na validação do usuário', validation.error);
        res.status(422).send(validation.error.details[0].message);
        return;
    }
    try{
        const checkName = await db.collection('participants').findOne({name: body.name});
        if(checkName){
            res.status(409).send('Nome de usuário já existente');
            console.log('Nome de usuário já existente');
            return;
        }
        
        const loginMessage = {
            from: body.name,
            to: 'Todos',
            text: 'entra na sala...',
            type: 'status',
            time: dayjs().format('HH:MM:SS')
        }
        await db.collection('participants').insertOne(participant);
        await db.collection('messages').insertOne(loginMessage);
        console.log(loginMessage);
        res.status(201);      
    }catch{
        res.status(422).send("Erro ao cadastrar usuário");
    }
}

export async function getParticipants(req, res){
    try{
        const response =  await db.collection('participants').find({}).toArray();
        console.log(response);
        res.send(response);
    }catch{
        console.log('erro')
        res.status(500).send('Erro');
    }
}