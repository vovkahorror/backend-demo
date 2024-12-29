import express from 'express';
import {HTTP_STATUSES} from '../common/enums/http-statuses';

export const getMainRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send({message: 'Hello'});
    });

    router.get('/status', (req, res) => {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    });

    return router
};