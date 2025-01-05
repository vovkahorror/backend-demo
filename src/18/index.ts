import express from 'express';
import {productsRouter} from './routers/products-router';
import {addressesRouter} from './routers/addresses-router';

const app = express();

const port = process.env.PORT || 5000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});