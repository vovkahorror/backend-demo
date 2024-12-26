import express from 'express';
import {getCoursesRouter} from './routes/courses';
import {db} from './db/db';
import {addTestsRoutes} from './routes/tests';
import {getMainRouter} from './routes/main';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const mainRoutes = getMainRouter();
app.use('/', mainRoutes);

const coursesRouter = getCoursesRouter(db);
app.use('/courses', coursesRouter);

addTestsRoutes(app, db);