const db = require('../models');
const QRCode= require('qrcode');

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

exports.getAllOrders = function (req, res, next){
    db.order.findAll().then(result => res.json({
        success: true,
        result : result,
    })).catch(error => res.json({
        success : false,
        error : error
    }));
}

exports.createOrder = (req, res, next) => {
    const {
        id_client,
        id_pharmacy,
        total_price,
        detail,
        products,
    } = req.body;

    let i=1;

    if(!id_client || !id_pharmacy || !total_price || !products ){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        if(products.length > 0){
            db.order.create({
                status : 0,
                detail : detail,
                id_client : id_client,
                id_pharmacy : id_pharmacy,
                total_price : total_price
            }).then(new_order => {
                products.forEach(product => {
                    db.order_detail.create({
                        id_product : product.id_product,
                        id_order : new_order.id,
                        quantity : product.quantity
                    }).then(() => {
                        if(i === products.length){
                            res.json({
                                success: true,
                                result: new_order,
                            })
                        }
                        i++;
                    }).catch(error => res.json({
                        success: false,
                        error: "Informations erronées",
                        info: error
                    }));
                })
            }).catch(error => res.json({
                success: false,
                error: "Informations erronées",
                info: error
            }));
        } else{
            res.json({
                success: false,
                error: "Aucun produit dans votre commande"
            })
        }
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

exports.qrCode = function (req, res, next) {
    const {
        order_id,
    } = req.body;

    let data = "{order_id:"+order_id+",id_client:"+id_client+",id_pharmacy:"+id_pharmacy+"}";

    QRCode.toDataURL(data)
        .then(base64 => {
            db.order.create({
                id_order : order_id,
                data : base64,
            }).then(new_qrcode => res.json({
                success: true,
                result: new_qrcode,
            })).catch(error => res.status(500).json({
                success: false,
                error: error,
            }))
        })
        .catch(error => res.status(500).json({
            success: false,
            error: error,
        }));
}
