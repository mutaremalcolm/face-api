import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.cjs';
import signin from './controllers/signin.cjs';
import profile from './controllers/profile.cjs';
import { handleApiCall, handleImage } from './controllers/image.mjs';
// import { client } from 'pg';
import fetch from 'cross-fetch';


const db = knex({
    client: 'pg',
    connectionString: 'postgres://smart_brain_4w94_user:13wmUVDQ51bgIWimWK4fxWe6N9B80Gd4@dpg-cj4bth59aq047cblhulg-a/smart_brain_4w94',
    ssl: {rejectUnauthorized: false},
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
}); 

const app = express();
app.use(bodyParser.json());
app.use(cors({}));

app.get('/', (req, res)=> {
    res.send('success');
});

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res)=> {handleImage(req, res, db)});
app.post('/imageurl', (req, res)=> {handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
 