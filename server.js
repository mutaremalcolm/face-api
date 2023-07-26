import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './controllers/register.cjs';
import signin from './controllers/signin.cjs';
import profile from './controllers/profile.cjs';
import { handleApiCall, handleImage } from './controllers/image.mjs';
//import { Client } from 'pg';
import fetch from 'cross-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;


const db = knex({
    client: 'pg',
    connection: {
        connectionString : 'process.env.DATABASE_URL',
      ssl: {
        rejectUnauthorized: true
      }
    }
  }); 

//db.select('*').from('users').then(data => {
    //console.log(data);
//});

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: "https://sheltered-caverns-07603-a1c66e3151bd.herokuapp.com"}))

app.get('/', (req, res)=> {
    res.send('success');
});

app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res)=> {handleImage(req, res, db)});
app.post('/imageurl', (req, res)=> {handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})
 