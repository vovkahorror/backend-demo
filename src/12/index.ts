import express from 'express'

const app = express()

const port = process.env.PORT || 5000

const products = [{title: 'apple'}, {title: 'potato'}]
const addresses = [{value: 'Kherson'}, {title: 'Kyiv'}, {title: 'Ivano-Frankivsk'}]

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/addresses', (req, res) => {
    res.send(addresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})