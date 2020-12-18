const db = require('../models');

exports.createOrderDetail = async function(products, order_id){
    let tab=[];

    for (const product of products) {
        tab.push(await db.order_detail.create({id_product : product.id_product, id_order : order_id, quantity : product.quantity}))
    }

    return tab
}

exports.getOrderDetailById = function(req, res, next) {
    const {
        order_detail_id
    } = req.body;

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
