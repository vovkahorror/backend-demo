import express from 'express'

const app = express()

const port = process.env.PORT || 5000

const products = [{title: 'apple'}, {title: 'potato'}]
const addresses = [{value: 'Kherson'}, {title: 'Kyiv'}, {title: 'Ivano-Frankivsk'}]

