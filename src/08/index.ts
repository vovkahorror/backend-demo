import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/nastya', (req, res) => {
    res.send('Hello Nastya!');
});

app.get('/vova', (req, res) => {
    res.send('Hello Vova!');
});

app.post('/user', (req, res) => {
    res.send('User created');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});