import express from 'express'

const app = express()

const port = process.env.PORT || 5000

const products = [{title: 'apple'}, {title: 'potato'}]
const addresses = [{id: 1, value: 'Kherson'}, {id: 2, title: 'Kyiv'}, {id: 3, title: 'Ivano-Frankivsk'}]

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/products/:productTitle', (req, res) => {
    const product = products.find(p => p.title === req.params.productTitle)

    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

app.get('/addresses', (req, res) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req, res) => {
    res.send(addresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})