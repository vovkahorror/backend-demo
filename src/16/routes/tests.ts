import express from 'express';
import {DBType} from '../db/db';

import {HTTP_STATUSES} from '../common/enums/http-statuses';

export const getTestsRouter = (db: DBType)=> {
    const coursesRouter = express.Router();

    coursesRouter.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });

    return coursesRouter
}