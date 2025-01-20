import {Router} from 'express';
import {addressesRepository} from '../repositories/addresses-repository';

export const addressesRouter = Router({});

addressesRouter.get('/', (req, res) => {
    const foundProducts = addressesRepository.findAddresses(req.query.title?.toString());
    res.send(foundProducts);
});

addressesRouter.get('/:id', (req, res) => {
    const address = addressesRepository.findAddressById(+req.params.id);

    if (address) {
        res.send(address);
    } else {
        res.send(404);
    }
});