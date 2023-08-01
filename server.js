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

const app = express();
app.use(bodyParser.json());
app.use(cors({}));

const db = knex({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
}); 


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
 