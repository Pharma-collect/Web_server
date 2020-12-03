const express = require('express');
const { rmSync } = require('fs');
const router = express.Router();
const db = require('../models');

router.get('/getOrderById', function(req, res, next) {
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
});

router.get('/getOrderByPharmacy', function(req, res, next) {
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
});


router.get('/getOrderByClient', function(req, res, next) {
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
});

router.get('/getOrderStatusById', function(req, res, next) {
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
});

router.get('/getOrderDetailById', function(req, res, next) {
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
});


router.get('/getOrderByStatus', function(req, res, next) {
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
});

router.get('/getAllOrders', function (res, req, next){
    allOrders(res, req);
});

function allOrders(req, res){
    db.order.findAll().then(result => res.json({
        success: true, 
        result : result, 
    })).catch(error => res.json({
        success : false, 
        error : error

    }));

}





module.exports = router;