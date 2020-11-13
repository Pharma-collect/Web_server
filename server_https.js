const https = require('https');
const app = require('./app');
const models = require('./models');
const fs = require('fs');

// temporary to allow access to the requests because we have a self-signed certificate --> searching in progress..
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

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

function onErrorHandler(error) {
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

const server = https.createServer({
    key: fs.readFileSync('/etc/ssl/selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/selfsigned.crt')
}, app);

models.sequelize.sync().then(function() {
    server.listen(port);
    server.on('error', onErrorHandler);
    server.on('listening', onListening);
});
