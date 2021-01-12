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

    if(!pharmacy_id){
        res.json({
            success: false,
            error: "Veuillez préciser une pharmacie"
        })
    } else {
        db.product.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(result => {
            if(result.length > 0){
                res.json({
                    success: true,
                    result: result,
                })
            } else {
                res.json({
                    success: true,
                    error: "Aucun produit dans cette pharmacie",
                    result: result,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
        }));
    }
}

exports.getProductById = function(req, res, next) {
    const {
        product_id
    } = req.body;

    if(!product_id){
        res.json({
            success: false,
            error: "Veuillez préciser un id de produit"
        })
    } else {
        db.product.findOne({
            where: {
                id: product_id,
            }
        }).then(result => {
            if(result){
                res.json({
                    success: true,
                    result: result,
                })
            } else {
                res.json({
                    success: false,
                    error: "Ce produit n'existe pas",
                    result: result,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
        }));
    }
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

exports.updateProduct = function (req, res) {
    const {
        product_id,
        title,
        price,
        image_url,
        description,
        capacity,
    } = req.body;

    if(!product_id){
        res.json({
            success: false,
            error: "Veuillez précisez un produit à modifier"
        })
    } else {
        db.product.findOne({
            where: {
                id: product_id,
            }
        }).then(user => {
            if(user){
                user.update({
                    title: (title ? title : user.title),
                    price: (price ? price : user.price),
                    image_url: (image_url ? image_url : user.image_url),
                    description: (description ? description : user.description),
                    capacity: (capacity ? capacity : user.capacity),
                }).then(user_update =>res.json({
                    success: true,
                    result: user_update,
                })).catch(error => res.status(500).json({
                    success: false,
                    error: error,
                }))

            } else {
                res.json({
                    success: false,
                    error: "Produit introuvable",
                    result: user,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
        }));
    }
}


exports.deleteProductById = function(req, res, next) {
    const {
        product_id
    } = req.body;

    if (!product_id){
        res.json({
            success: false,
            error: "Veuillez indiquer un id de produit"
        })
    } else {
        db.product.destroy({
            where: {
                id: product_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Ce produit n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}
