const express = require('express')
const router = express.Router();
const db = require('../models');

router.get('/getPharmacyByName', function(req, res, next) {
    const {
        name
    } = req.body;

    console.log(name);

    db.pharmacy.findAll({
        where: {
            name: name,
        }
    }).then(function(result){
        if (result.length === 0){
            res.json({
                success: true,
                error: "Cette pharmacie n'existe pas",
            })
        } else {
            res.json({
                success: true,
                result: result,
            })
        }
    }).catch(error => res.json({
        success: false,
        error: error
    }));
});

module.exports = router;
