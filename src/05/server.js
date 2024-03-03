const http = require('http');
const fs = require('fs');

let requestCount = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        // Read the favicon from file
        fs.readFile('favicon.ico', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
            } else {
                // Send the favicon as response
                res.writeHead(200, {'Content-Type': 'image/x-icon'});
                res.end(data);
            }
        });
    } else {
        // Handle other requests
        requestCount++;

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
    }
});

server.listen(3003);
