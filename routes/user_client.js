const express = require('express')
const router = express.Router();
const db = require('../models');

router.get('/getAllUserClient', function(req, res, next) {
    db.user_client.findAll().then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
            success: false,
            result: [],
            error: error
    }));
});

router.post('/', (req, res, next) => {
    const {
        name
    } = req.body;

    console.log(name);

    res.status(201).json({
        message: 'test post'
    });
});

module.exports = router;
