import express from "express";
import bodyParser from 'body-parser';
import {productsRouter} from './routers/products-router';

const app = express()

app.use(bodyParser())

const port = process.env.PORT || 5000

app.use('products', productsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})