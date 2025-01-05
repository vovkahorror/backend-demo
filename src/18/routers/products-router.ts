import {Router} from 'express';

const products = [{id: 1, title: 'apple'}, {id: 2, title: 'potato'}];

export const productsRouter = Router({})

productsRouter.get('/', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        const filteredProducts = products.filter(p => p.title.includes(searchString));
        res.send(filteredProducts);
    } else {
        res.send(products);
    }
});

productsRouter.post('/', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title,
    };

    products.push(newProduct);
    res.status(201).send(newProduct);
});

productsRouter.get('/:productTitle', (req, res) => {
    const product = products.find(p => p.title === req.params.productTitle);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});

productsRouter.put('/:id', (req, res) => {
    const product = products.find(p => p.id === +req.params.id);

    if (product) {
        product.title = req.body.title;
        res.send(product);
    } else {
        res.send(404);
    }
});

productsRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }

    res.send(404);
});