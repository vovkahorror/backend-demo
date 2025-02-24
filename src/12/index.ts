import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const products = [{id: 1, title: 'apple'}, {id: 2, title: 'potato'}];
const addresses = [{id: 1, value: 'Kherson'}, {id: 2, title: 'Kyiv'}, {id: 3, title: 'Ivano-Frankivsk'}];

app.get('/products', (req, res) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        const filteredProducts = products.filter(p => p.title.includes(searchString));
        res.send(filteredProducts);
    } else {
        res.send(products);
    }
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title,
    };

    products.push(newProduct);
    res.status(201).send(newProduct);
});

app.get('/products/:productTitle', (req, res) => {
    const product = products.find(p => p.title === req.params.productTitle);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === +req.params.id);

    if (product) {
        product.title = req.body.title;
        res.send(product);
    } else {
        res.send(404);
    }
});

app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }

    res.send(404);
});

app.get('/addresses', (req, res) => {
    res.send(addresses);
});

app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(a => a.id === +req.params.id);

    if (address) {
        res.send(address);
    } else {
        res.send(404);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});