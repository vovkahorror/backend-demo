import {Express, Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from '../types';
import {QueryCoursesModel} from '../models/QueryCoursesModel';
import {CourseViewModel} from '../models/CourseViewModel';
import {URIParamsCourseIdModel} from '../models/URIParamsCourseIdModel';
import {CreateCourseModel} from '../models/CreateCourseModel';
import {UpdateCourseModel} from '../models/UpdateCourseModel';
import {CourseType, DBType} from '../db/db';

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,

    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,
}

export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => ({
    id: dbCourse.id,
    title: dbCourse.title,
});

export const addCoursesRoutes = (app: Express, db: DBType)=> {
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
}