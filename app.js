const express = require('express');
const bodyParser = require('body-parser');

//routes declaration
const user_client_routes = require("./routes/user_client");

const app = express(); //create express application

//principal middleware element
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes utilisation
app.use('/api/user_client', user_client_routes);

module.exports = app;
