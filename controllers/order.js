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

exports.getOrderStatusById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    status: result.find(order => order.id === parseInt(order_id)).status,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.getOrderDetailById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    detail: result.find(order => order.id === parseInt(order_id)).detail,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}


exports.getOrderPreparatorById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    id_preparator: result.find(order => order.id === parseInt(order_id)).id_preparator,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}



exports.getOrderContainerById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    console.log(order_id);

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    id_container: result.find(order => order.id === parseInt(order_id)).id_container,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}


exports.getOrderQrCodeById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    id_qrcode: result.find(order => order.id === parseInt(order_id)).id_qrcode,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}


exports.getOrderPharmacyById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    id_pharmacy: result.find(order => order.id === parseInt(order_id)).id_pharmacy,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.getOrderTotalPriceById = function(req, res, next) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de commande"
        })
    } else {
        db.order.findAll({
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
                    total_price: result.find(order => order.id === parseInt(order_id)).total_price,
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
        detail,
        id_client,
        id_pharmacy,
        total_price 
    } = req.body;

    if(!detail || !id_client || !id_pharmacy || !total_price){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order.create({
            status : 0,
            detail : detail, 
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
