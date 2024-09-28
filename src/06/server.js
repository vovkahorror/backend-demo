const http = require('http');
const fs = require('fs');

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const server = http.createServer(async (req, res) => {
        switch (req.url) {
            case '/':
            case '/home': {
                try {
                    const data = await readFile('./home.html');
                    res.write(data);
                } catch (err) {
                    res.write('Some error, 500');
                }
                break;
            }
            case '/about': {
                await delay(3000);
                res.write('About');
                break;
            }
            default: {
                res.write('404, page not found');
            }
        }
        res.end();
    }
);

server.listen(3003);