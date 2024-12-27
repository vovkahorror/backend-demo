import express from 'express';
import {HTTP_STATUSES} from '../common/enums/http-statuses';

export const getMainRouter = () => {
    const mainRouter = express.Router();

    mainRouter.get('/', (req, res) => {
        res.send({message: 'Hello'});
    });

    mainRouter.get('/status', (req, res) => {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });

    return mainRouter
};