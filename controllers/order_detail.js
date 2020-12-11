const db = require('../models');



exports.getOrderDetailById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.order_detail.findAll({
            where: {
                id: order_id,
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