import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors())
const database = {
   users: [
    {
       id : '123',
       name: 'John',
       email: 'john@gmail.com',
       password: 'cookies',
       entries: 0,
       joined: new Date()
    },
    {
        id : '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas', 
        entries: 0,
        joined: new Date()
     }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users);
});

app.post('/signin', (req, res) => {    
bcrypt.compare("apples", '$2a$10$AMRxE5kWFp/fKMEL/zB2retY9tR1w5fg2rJPt99w22S59DqPVW8VG', function(err, res) {
    console.log('first guess', res)
});
bcrypt.compare("veggies", '$2a$10$AMRxE5kWFp/fKMEL/zB2retY9tR1w5fg2rJPt99w22S59DqPVW8VG', function(err, res) {
    console.log('second guess', res)
});
    if (req.body.email === database.users[0].email &&  
        req.body.password === database.users[0].password) {
        res.json('success');
    }else {
         res.status(400).json('error in loggin in ');
    }
    res.json('singin')
});

app.post('/register', (req, res)=> {
    const {email, name, password} = req.body;
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params; 
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0]);
        }else {
            res.status(400).json('Not found');
        }
        
    })
    .catch(err => res.status(400).json('error getting user'))     
})

app.put('/image', (req, res)=> {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })  
    .catch(err => res.status(400).json('unable to get entries'))      
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/