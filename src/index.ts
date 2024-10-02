import express, {Request, Response} from 'express';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(404);
});

app.get('/authors', (req: Request, res: Response) => {
    res.json([
        {id: 1, author: 'Stephen King'},
        {id: 2, author: 'Joe Hill'},
        {id: 3, author: 'Clive Barker'},
    ]);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});