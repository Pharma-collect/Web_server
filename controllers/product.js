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
