const http = require('http');

const server = http.createServer((request, response) => {
    response.end('First response');
});

server.listen(process.env.PORT || 3000);
