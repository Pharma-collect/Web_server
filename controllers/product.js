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
