import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import cors from "cors"
import fs from 'fs'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import users from './data/users.json' assert {type: 'json'}
const usersJson = __dirname + '/data/users.json'


var app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));


app.get('/users', async (req, res) => { 
    res.send({
        success: true,
        users: users
    })
});
app.post('/users', async (req, res) => {
    let body = req.body;
    users.push(body)
    fs.writeFileSync(usersJson, JSON.stringify(users))
    res.send({
        success: true
    })
})
app.put('/users/:id', async (req, res) => {
    let body = req.body;
    console.log(body)
    users[req.params.id] = body
    fs.writeFileSync(usersJson, JSON.stringify(users))
    res.send({
        success: true
    })
})
app.delete('/users/:id', async (req, res) => {
    let body = req.body;
    users.splice(parseInt(req.params.id, 10), 1)
    fs.writeFileSync(usersJson, JSON.stringify(users))
    res.send({
        success: true
    })
})

var httpServer = http.createServer(app);
console.log('Server running at port: 3000')
httpServer.listen(3000);