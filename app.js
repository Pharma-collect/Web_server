const express = require('express');
const bodyParser = require('body-parser');

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

//You can put "use" which allows you to call in post or in get.

//Postman : send data in x-www-form-urlencoded or raw with JSON settings

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

//get specifically
app.get('/api/stuff', (req, res, next) => {
    const stuff = {
        result: [
            {
                _id: 1,
                title: 'Mon premier objet',
                description: 'Les infos de mon premier objet',
                price: 4900,
                userId: 3,
            },
            {
                _id: 2,
                title: 'Mon deuxième objet',
                description: 'Les infos de mon deuxième objet',
                price: 2900,
                userId: 3,
            },
        ],
        status: "success",
    };
    res.status(200).json(stuff);
});

module.exports = app;

/*//middleware = range of functions
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
});*/
