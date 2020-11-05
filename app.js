const express = require('express');

const app = express(); //create express application

//middleware = range of functions

//first middleware element
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next(); //allow to access to the next middleware
});

app.use((req, res, next) => {
    res.status(201); //example
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue ! Bis' });
    next();
});

//last middleware element
app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;
