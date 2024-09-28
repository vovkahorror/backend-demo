import express from 'express';

const app = express();
const port = 3000;

//create middleWare for parse json from body in post requests
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'full-stack'},
        {id: 4, title: 'mobile'},
    ],
};

app.get('/', (req, res) => {
    res.send({message: 'Hello'});
});

app.get('/courses', (req, res) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.indexOf(req.query.title as string) > -1);
    }

    res.json(foundCourses);
});

app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(course => course.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }

    res.json(foundCourse);
});

app.post('/courses', (req, res) => {
    if (!req.body.title || !req.body.title.trim()) {
        res.sendStatus(400);
        return;
    }

    const newCourse = {
        id: +(new Date()),
        title: req.body.title,
    };
    db.courses.push(newCourse);

    res
        .status(201)
        .json(newCourse);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});