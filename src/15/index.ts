import express, {Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from './types';

export const app = express();
const port = 3000;

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,
}

//create middleWare for parse json from body in post requests
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

type CourseType = {
    id: number,
    title: string,
};

const db: {courses: CourseType[]} = {
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

app.get('/status', (req, res) => {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.get('/courses', (req: RequestWithQuery<{title: string}>, res: Response<CourseType[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.indexOf(req.query.title) > -1);
    }

    res.json(foundCourses);
});

app.get('/courses/:id', (req: RequestWithParams<{id: string}>, res: Response<CourseType>) => {
    const foundCourse = db.courses.find(course => course.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(foundCourse);
});

app.post('/courses', (req: RequestWithBody<{title: string}>, res: Response<CourseType>) => {
    if (!req.body.title || !req.body.title.trim()) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const newCourse = {
        id: +(new Date()),
        title: req.body.title,
    };
    db.courses.push(newCourse);

    console.log(db.courses);

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newCourse);
});

app.delete('/courses/:id', (req: RequestWithParams<{id: string}>, res) => {
    const filteredCourses = db.courses.filter(course => course.id !== +req.params.id);

    if (filteredCourses.length === db.courses.length) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json('Not found requested id');
        return;
    }

    console.log(db.courses);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put('/courses/:id', (req: RequestWithParamsAndBody<{id: string}, {title: string}>, res) => {
    if (!req.body.title || !req.body.title.trim()) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const foundCourse = db.courses.find(course => course.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    foundCourse.title = req.body.title;

    console.log(db.courses);

    res.sendStatus(HTTP_STATUSES.OK_200);
});

app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});