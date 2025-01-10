import express, {NextFunction} from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.get('/products', (req, res, next: NextFunction) => {
    // @ts-ignore
    req.blalbla = 'hello';
    next();
}, (req, res) => {
    // @ts-ignore
    const blalbla = req.blalbla;
    res.send({value: blalbla + ' world!'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});