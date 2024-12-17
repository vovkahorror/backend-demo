import express from 'express';
import {addCoursesRoutes} from './routes/courses';
import {db} from './db/db';
import {addTestsRoutes} from './routes/tests';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

addCoursesRoutes(app);
addTestsRoutes(app, db);