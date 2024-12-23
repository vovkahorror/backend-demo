import express from 'express';
import {getCoursesRoutes} from './routes/courses';
import {db} from './db/db';
import {addTestsRoutes} from './routes/tests';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const coursesRouter = getCoursesRoutes(db);
app.use('/courses', coursesRouter)

addTestsRoutes(app, db);