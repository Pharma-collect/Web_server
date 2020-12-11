const db = require('../models');



exports.getOrderDetailById = function(req, res, next) {
    const {
        order_detail_id
    } = req.body;

    console.log(order_detail_id);

    if (!order_detail_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.order_detail.findAll({
            where: {
                id: order_detail_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Cette commande n'existe pas",
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
    }
}

exports.createOrderDetail = function(req, res, next) {
    const {
        products,
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id || !products){
        res.json({
            success: false,
            error: "Données manquantes"
        })
    } else {
        products.forEach(product => {
            db.order_detail.create({
                id_product : product.id_product,
                id_order : order_id, 
                quantity : product.quantity
            }).then(function(result){
                res.json({
                    success: true,
                    result: result,
                })
            }).catch(error => res.json({
                success: false,
                error: "Informations erronées"
            }));
        })
    }
}


exports.deleteOrderDetailById = function(req, res, next) {
    const {
        order_detail_id
    } = req.body;

    if (!order_detail_id){
        res.json({
            success: false,
            error: "Veuillez indiquer un id de commande"
        })
    } else {
        db.order_detail.destroy({
            where: {
                id: order_detail_id,

            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce detail n'existe pas.",
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
