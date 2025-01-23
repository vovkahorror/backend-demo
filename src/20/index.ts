import express from 'express';
import {productsRouter} from './routers/products-router';

const app = express()

app.use(express.json())

const port = process.env.PORT || 5000

app.use('products', productsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})