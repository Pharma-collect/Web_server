const db = require('../models');
const utils = require('./utils');

exports.createOrderDetail = async function(products, order_id){
    let tab=[];

    for (const product of products) {
        tab.push(await db.order_detail.create({id_product : product.id_product, id_order : order_id, quantity : product.quantity}))
    }

    return tab
}

exports.getOrderDetailById = function(req, res) {
    const {
        order_detail_id
    } = req.body;

    if (!order_detail_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.order_detail.findOne({
            where: {
                id: order_detail_id,
            }
        }).then(function(result){
            if (!result){
                res.status(204).json({
                    success: true,
                    error: "Cette commande n'existe pas",
                    result: result
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

exports.getOrderDetailsByOrder = async function(req, res) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        await utils.getElementsByX("order_detail","id_order", order_id)
            .then(async function(details){
                if (details.length === 0) {
                    res.status(204).json({
                        success: true,
                        error: "Aucun details pour cette commande",
                        result: details
                    })
                } else {
                    await getDetailsInfo(details)

                    res.status(200).json({
                        success: true,
                        result: details,
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}

async function getDetailsInfo(details){
    for(let detail of details){
        try{
            detail.product = await db.product.findOne({where: {id: detail.id_product,}})
            detail.order = await db.order_global.findOne({where: {id: detail.id_order,}})
        } catch (e) {
            console.log(e)
        }
    }

    return details;
}

exports.deleteOrderDetailById = function(req, res) {
    const {
        order_detail_id
    } = req.body;

    if (!order_detail_id){
        res.status(422).json({
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
                res.status(204).json({
                    success: true,
                    error: "Ce detail n'existe pas.",
                })
            } else {
                res.status(200).json({
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
