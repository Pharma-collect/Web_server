const db = require('../models');

exports.getAllProducts = function(req, res, next) {
    db.product.findAll().then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
        success: false,
        error: error
    }));
}

exports.getProductsByPharmacy = function(req, res, next) {
    const {
        pharmacy_id,
    } = req.body;

    db.product.findAll({
        where: {
            id_pharmacy: pharmacy_id,
        }
    }).then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
        success: false,
        error: error
    }));
}

exports.createProduct = function (req, res, next) {
    const {
        title,
        price,
        image_url,
        description,
        capacity,
        pharmacy_id
    } = req.body;

    if(!title || !price || !pharmacy_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.product.create({
            title: title,
            description: description,
            price: price,
            image_url: image_url,
            capacity: capacity,
            id_pharmacy: pharmacy_id,
        }).then(function(result){
            res.json({
                success: true,
                result: result,
            })
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

