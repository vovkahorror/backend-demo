import {Router} from 'express';
import {productsRepository} from '../repositories/products-repository';

export const productsRouter = Router({});

productsRouter.post('/', (req, res) => {
    if (!req.body.title.trim()) {
        res.status(400).send({message: 'title is required'});
        return;
    }

    const newProduct = productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});

productsRouter.put('/:id', (req, res) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);

    if (isUpdated) {
        const product = productsRepository.findProductById(+req.params.id);
        res.send(product);
    } else {
        res.send(404);
    }
});

productsRouter.get('/', (req, res) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString());
    res.send(foundProducts);
});

productsRouter.get('/:id', (req, res) => {
    const product = productsRepository.findProductById(+req.params.id);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});

productsRouter.get('/:productTitle', (req, res) => {
    const product = productsRepository.findProductByTitle(req.params.productTitle);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});

productsRouter.delete('/:id', (req, res) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id);

    res.send(isDeleted ? 204 : 404);
});