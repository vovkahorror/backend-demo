import express, {Response} from 'express';
import {CourseViewModel} from './models/CourseViewModel';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from './types';
import {QueryCoursesModel} from './models/QueryCoursesModel';
import {URIParamsCourseIdModel} from './models/URIParamsCourseIdModel';
import {CreateCourseModel} from './models/CreateCourseModel';
import {UpdateCourseModel} from './models/UpdateCourseModel';

export const app = express();

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,
}

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();
export type CourseType = {
    id: number,
    title: string,
    studentsCount: number
};
export const db: { courses: CourseType[] } = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 8},
        {id: 2, title: 'back-end', studentsCount: 12},
        {id: 3, title: 'full-stack', studentsCount: 6},
        {id: 4, title: 'mobile', studentsCount: 10},
    ],
};
export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => ({
    id: dbCourse.id,
    title: dbCourse.title,
});

app.use(jsonBodyMiddleware);

app.get('/', (req, res) => {
    res.send({message: 'Hello'});
});

app.get('/status', (req, res) => {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.get('/courses', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.indexOf(req.query.title) > -1);
    }

    res.json(foundCourses.map(getCourseViewModel));
});

app.get('/courses/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
    const foundCourse = db.courses.find(course => course.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }

    res.json(getCourseViewModel(foundCourse));
});

app.post('/courses', (req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
    if (!req.body.title || !req.body.title.trim()) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }

    const newCourse: CourseType = {
        id: +(new Date()),
        title: req.body.title,
        studentsCount: 0
    };
    db.courses.push(newCourse);

    console.log(db.courses);

    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(getCourseViewModel(newCourse));
});

app.delete('/courses/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
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

app.put('/courses/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res) => {
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