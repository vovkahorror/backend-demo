const http = require('http');

let requestCount = 0;

const sever = http.createServer((req, res) => {
    console.log(req);

    if (req.url !== '/favicon.ico') {
        requestCount++;
    }

    switch (req.url) {
        case '/':
        case '/nastya': {
            res.write('Nastya');
            break;
        }
        case '/vova': {
            res.write('Vova');
            break;
        }
        default: {
            res.write('404 Not Found');
        }
    }

    res.write(' ' + requestCount);
    res.end();
});

sever.listen(3003);