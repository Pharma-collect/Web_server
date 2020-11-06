const http = require('http');
const app = require('./app');
const models = require('./models');

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

function errorHandler(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

function onListening() {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

models.sequelize.sync().then(function() {
    server.listen(port, function() {
        console.log('Express server listening on port ' + server.address().port);
    });
    server.on('error', errorHandler);
    server.on('listening', onListening);
});
