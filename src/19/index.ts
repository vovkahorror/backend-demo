import express, {NextFunction, Request, Response} from 'express';

const app = express();

const port = process.env.PORT || 5000;

const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blalbla = 'hello';
    next();
}

const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(blablaMiddleware, authGuardMiddleware)

app.get('/products', (req, res) => {
    // @ts-ignore
    const blalbla = req.blalbla;
    res.send({value: blalbla + ' world!'});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});