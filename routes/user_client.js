const express = require('express')
const router = express.Router();
const db = require('../models');

router.get('/', function(req, res, next) {
    db.user_client.findAll().then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
            success: false,
            data: [],
            error: error
        }));
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

module.exports = router;
