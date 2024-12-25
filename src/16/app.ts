import express from 'express';
import {getCoursesRoutes} from './routes/courses';
import {db} from './db/db';
import {addTestsRoutes} from './routes/tests';
import {getMainRoutes} from './routes/main';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const mainRoutes = getMainRoutes();
app.use('/', mainRoutes);

const coursesRouter = getCoursesRoutes(db);
app.use('/courses', coursesRouter);

addTestsRoutes(app, db);