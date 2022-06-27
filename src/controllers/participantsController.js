import db from '../db.js';

let users = [];

export async function setParticipants(req, res){
    const participants = {
        name: req.body.name,
        lastStatus: req.body.lastStatus
    }
    users.push(participants);
    res.sendStatus(201);
}