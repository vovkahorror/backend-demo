import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});