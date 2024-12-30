import express from 'express';
import {getCoursesRouter} from './routes/courses';
import {db} from './db/db';
import {getTestsRouter} from './routes/tests';
import {getMainRouter} from './routes/main';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use('/', getMainRouter());
app.use('/courses', getCoursesRouter(db));
app.use('/__test__', getTestsRouter(db));