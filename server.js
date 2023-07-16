import express from 'express';

const app = express();

app.get('/', (req, res)=> {
    res.send('this is working');
});

app.post('/signin', (req, res) => {
    res.json('singin')
});

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