const db = require('../models');

exports.getAllProducts = function(req, res) {
    db.product.findAll().then(result => res.status(200).json({
        success: true,
        result: result,
    })).catch(error => res.status(500).json({
        success: false,
        error: error
    }));
}

exports.getProductsByPharmacy = function(req, res) {
    const {
        pharmacy_id,
    } = req.body;

    if(!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.product.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(result => {
            if(result.length > 0){
                res.status(200).json({
                    success: true,
                    result: result,
                })
            } else {
                res.status(204).json({
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

exports.getProductById = function(req, res) {
    const {
        product_id
    } = req.body;

    if(!product_id){
        res.status(422).json({
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
                res.status(200).json({
                    success: true,
                    result: result,
                })
            } else {
                res.status(204).json({
                    success: true,
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

exports.getProductsForShop = function(req, res) {
    const {
        pharmacy_id,
    } = req.body;

    if(!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Veuillez préciser un id de pharmacie"
        })
    } else {
        db.product.findAll({
            where: {
                id_pharmacy: pharmacy_id,
                prescription_only: 0
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(422).json({
                    success: true,
                    error: "Aucun produit disponible dans cette pharmacie",
                })
            } else {
                res.status(200).json({
                    success: true,
                    result: result,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}

exports.createProduct = function (req, res) {
    const {
        title,
        price,
        image_url,
        description,
        capacity,
        pharmacy_id,
        prescription_only
    } = req.body;

    if(!title || !price || !pharmacy_id){
        res.status(422).json({
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
            prescription_only: (prescription_only ? prescription_only : 0),
        }).then(function(result){
            res.status(200).json({
                success: true,
                result: result,
            })
        }).catch(error => res.status(500).json({
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
        prescription_only
    } = req.body;

    if(!product_id){
        res.status(422).json({
            success: false,
            error: "Informations manquantes (au moins product_id)"
        })
    } else {
        db.product.findOne({
            where: {
                id: product_id,
            }
        }).then(current_product => {
            if(current_product){
                current_product.update({
                    title: (title ? title : current_product.title),
                    price: (price ? price : current_product.price),
                    image_url: (image_url ? image_url : current_product.image_url),
                    description: (description ? description : current_product.description),
                    capacity: (capacity ? capacity : current_product.capacity),
                    prescription_only: (prescription_only ? prescription_only : current_product.prescription_only),
                }).then(user_update =>res.status(200).json({
                    success: true,
                    result: user_update,
                })).catch(error => res.status(500).json({
                    success: false,
                    error: error,
                    info: "update"
                }))

            } else {
                res.status(204).json({
                    success: false,
                    error: "Produit introuvable",
                    result: current_product,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
            info: "find"
        }));
    }
}


exports.deleteProductById = function(req, res) {
    const {
        product_id
    } = req.body;

    if (!product_id){
        res.status(422).json({
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
                res.status(204).json({
                    success: true,
                    error: "Ce produit n'existe pas.",
                })
            } else {
                res.status(200).json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}
