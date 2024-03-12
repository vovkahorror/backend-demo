import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send({message: 'Hello'});
});

app.get('/courses', (req, res) => {
    res.json([
        {id: 1, name: 'front-end'},
        {id: 2, name: 'back-end'},
        {id: 3, name: 'full-stack'},
        {id: 4, name: 'mobile'},
    ]);
});

app.get('/courses/:id', (req, res) => {
    const foundCourse = [
        {id: 1, name: 'front-end'},
        {id: 2, name: 'back-end'},
        {id: 3, name: 'full-stack'},
        {id: 4, name: 'mobile'},
    ].find(course => course.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }

    res.json(foundCourse);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});