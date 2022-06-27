import express, {json} from 'express';
import cors from 'cors';
import router from './routes/index.js';
import db from './db.js';
import dayjs from 'dayjs';

const app = express();
app.use(cors());
app.use(json());
app.use(router);

setInterval(async() => {
    try{
        let userOn = await db.collection('participants').find().toArray();
        userOn.forEach(async(user) => {
            const time = Date.now();
            let timeDiff  = time - user.lastStatus;
            if(timeDiff > 10000){
                await db.collection('participants').deleteOne({name: user.name});
                await db.collection('messages').insertOne({
                    from: user.name,
                    to: 'Todos',
                    text: 'sai da sala...',
                    type: 'status',
                    time: dayjs().format('HH:MM:SS')
                });
            }
        });
    }catch(erro){
        res.send(erro);
    }
}, 10000)

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
}); 