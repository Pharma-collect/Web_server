const db = require('../models');

async function getOrderByX(my_key, value){
    let order;
    let query = {}

    query[my_key] = value;

    try {
        order =  await db.order.findAll({
            where: query
        })
    } catch (e) {
        console.log(e)
    }

    return order;
}

exports.getOrderById = async function(req, res, next) {
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
        getOrderByX("id", order_id, "Cette commande n'existe pas")
    }
}

exports.getOrderByPharmacy = async function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    console.log(pharmacy_id);

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de pharmacie"
        })
    } else {
        getOrderByX("id_pharmacy", pharmacy_id, "Cette pharmacie n'existe pas ou n'a pas de commandes.")
    }
}


exports.getOrderByClient = async function(req, res, next) {
    const {
        client_id
    } = req.body;

    console.log(client_id);

    if (!client_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de client"
        })
    } else {
        getOrderByX("id_client", client_id, "Ce client n'existe pas ou n'a pas de commandes")
    }
}

exports.getOrderByStatus = function(req, res, next) {
    const {
        order_status
    } = req.body;

    console.log(order_status);

    if (!order_status){
        res.json({
            success: false,
            error: "Merci de préciser un statut"
        })
    } else {
        getOrderByX("status", order_status, "Aucune commande avec ce statut n'existe")
    }
}

exports.getOrderByPreparator = function(req, res, next) {
    const {
        id_preparator
    } = req.body;

    console.log(id_preparator);

    if (!id_preparator){
        res.json({
            success: false,
            error: "Merci de préciser un preparateur"
        })
    } else {
        getOrderByX("id_preparator", id_preparator, "Aucune commande avec ce preparateur n'existe")
    }
}

exports.getAllOrders = function (res, req, next){
    allOrders(res, req);
}

exports.createOrder = (req, res, next) => {
    const {
        id_client,
        id_pharmacy,
        total_price 
    } = req.body;

    if(!id_client || !id_pharmacy || !total_price){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.create({
            status : 0,
            detail : null, 
            id_client : id_client, 
            id_preparator : null, 
            id_container : null, 
            id_qrcode : null, 
            id_pharmacy : id_pharmacy, 
            total_price : total_price
        }).then(function(result){
            res.json({
                success: true,
                result: result,
            })
        }).catch(error => res.json({
            success: false,
            error: "informations erronées"
        }));
    }
}


exports.deleteOrderById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Veuillez indiquer un id de commande"
        })
    } else {
        db.order.destroy({
            where: {
                id: order_id,

            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette commande n'existe pas.",
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



exports.updateOrderStatusById = function(req, res, next) {
    const {
        order_id,
        status
    } = req.body;

    if (!order_id || !status){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.update({status : status},{
            where: {
                id: order_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Cette commande n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.json({
            success: false,
            error: "informations erronées"
        }));
    }
}

exports.updateOrderPreparatorById = function(req, res, next) {
    const {
        order_id,
        preparator_id
    } = req.body;

    if (!order_id || !preparator_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.update({id_preparator : preparator_id},{
            where: {
                id: order_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Cette commande n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.json({
            success: false,
            error: "informations erronées"
        }));
    }
}

exports.updateOrderContainerById = function(req, res, next) {
    const {
        order_id,
        container_id
    } = req.body;

    if (!order_id || !container_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.update({id_container : container_id},{
            where: {
                id: order_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Cette commande n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.json({
            success: false,
            error: "informations erronées"
        }));
    }
}

exports.updateOrderQrCodeById = function(req, res, next) {
    const {
        order_id,
        qrcode_id
    } = req.body;

    if (!order_id || !qrcode_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.update({id_qrcode : qrcode_id},{
            where: {
                id: order_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
                    error: "Cette commande n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.json({
            success: false,
            error: "informations erronées"
        }));
    }
}




function allOrders(req, res){
    db.order.findAll().then(result => res.json({
        success: true, 
        result : result, 
    })).catch(error => res.json({
        success : false, 
        error : error

    }));

}
