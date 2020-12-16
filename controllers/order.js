const db = require('../models');

exports.getOrderById = function(req, res, next) {
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
        db.order.findAll({
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

exports.getOrderByPharmacy = function(req, res, next) {
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
        db.order.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette pharmacie n'existe pas ou n'a pas de commandes.",
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


exports.getOrderByClient = function(req, res, next) {
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
        db.order.findAll({
            where: {
                id_client: client_id
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce client n'existe pas ou n'a pas de commandes",
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
        db.order.findAll({
            where: {
                status: order_status,
                
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune commande avec ce statut n'existe",
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
        db.order.findAll({
            where: {
                id_preparator: id_preparator,
                
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune commande avec ce preparateur n'existe",
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



exports.updateOrder = function(req, res, next) {
    const {
        order_id,
        status,
        detail,
        id_client,
        id_preparator,
        id_qrcode,
        id_pharmacy,
        total_price
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.findOne({
            where: {
                id: order_id,
            }
        }).then(order => {
            if(order){
                order.update({
                    status: (status ? status : order.status),
                    detail: (detail ? detail : order.detail),
                    id_client: (id_client ? id_client : order.id_client),
                    id_preparator: (id_preparator ? id_preparator : order.id_preparator),
                    id_qrcode: (id_qrcode ? id_qrcode : order.id_qrcode),
                    id_pharmacy: (id_pharmacy ? id_pharmacy : order.id_pharmacy),
                    total_price: (total_price ? total_price : order.total_price),
                }).then(order_update =>res.json({
                    success: true,
                    result: order_update,
                })).catch(error => res.status(500).json({
                    success: false,
                    error: error,
                }))
            } else {
                res.json({
                    success: true,
                    error: "Commande introuvable",
                    result: order,
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
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
