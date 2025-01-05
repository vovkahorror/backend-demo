import {Router} from 'express';

const addresses = [{id: 1, value: 'Kherson'}, {id: 2, title: 'Kyiv'}, {id: 3, title: 'Ivano-Frankivsk'}];

export const addressesRouter = Router({})

addressesRouter.get('/', (req, res) => {
    res.send(addresses);
});

addressesRouter.get('/:id', (req, res) => {
    const address = addresses.find(a => a.id === +req.params.id);

    if (address) {
        res.send(address);
    } else {
        res.send(404);
    }
});