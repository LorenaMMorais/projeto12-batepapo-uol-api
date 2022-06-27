import db from '../db.js';

export async function setStatus(req, res){
    const user = req.headers.user;

    try{
        const checkUser = await db.collection('participants').findOne({name: user});
        if(!checkUser){
            console.log('Usuário não encontrado');
            res.sendStatus(404);
        }
        await dbParticipants.updateOne(
            {name: user},
            {$set: {lastStatus: Date.now()}}
        );
        res.send(200);
    }catch{
        res.send('Error ao buscar usuário!');
    }
}