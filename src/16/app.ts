import express from 'express';
import {addCoursesRoutes, HTTP_STATUSES} from './routes/courses';
import {db} from './db/db';

export const app = express();

//create middleWare for parse json from body in post requests
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

addCoursesRoutes(app);

app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});