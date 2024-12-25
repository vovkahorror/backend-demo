import express from 'express';
import {HTTP_STATUSES} from '../common/enums/http-statuses';

export const getMainRoutes = () => {
    const coursesRouter = express.Router();

    coursesRouter.get('/', (req, res) => {
        res.send({message: 'Hello'});
    });

    coursesRouter.get('/status', (req, res) => {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });

    return coursesRouter
};