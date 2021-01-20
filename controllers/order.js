const db = require('../models');
const Qrcode = require('./qrcode');
const OrderDetail = require('./order_detail');
const utils = require('./utils');


exports.getOrderById = async function(req, res, next) {
    const {
        order_id
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        await utils.getElementByX("order_global","id", order_id)
            .then(function(order){
                if (!order) {
                    res.json({
                        success: false,
                        error: "Cette commande n'existe pas",
                    })
                } else {
                    res.json({
                        success: true,
                        result: order,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.getOrderByPharmacy = async function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de pharmacie"
        })
    } else {
        await utils.getElementsByX("order_global","id_pharmacy", pharmacy_id)
            .then(function(order){
                if (order.length === 0) {
                    res.json({
                        success: true,
                        error: "Aucune commande trouvée",
                        result: order
                    })
                } else {
                    res.json({
                        success: true,
                        result: order,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}


exports.getOrderByClient = async function(req, res, next) {
    const {
        client_id
    } = req.body;

    if (!client_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de client"
        })
    } else {
        await utils.getElementsByX("order_global","id_client", client_id)
            .then(function(order){
                if (order.length === 0) {
                    res.json({
                        success: true,
                        error: "Aucune commande trouvée",
                        result: order
                    })
                } else {
                    res.json({
                        success: true,
                        result: order,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.getOrderByStatus = async function(req, res, next) {
    const {
        order_status
    } = req.body;

    const label = ["pending", "ready", "container", "finish"];

    if (!order_status || !label.includes(order_status)){
        res.json({
            success: false,
            error: "Merci de préciser un statut correct"
        })
    } else {
        await utils.getElementsByX("order_global","status", order_status)
            .then(function(order){
                if (order.length === 0) {
                    res.json({
                        success: true,
                        error: "Aucune commande trouvée",
                        result: order
                    })
                } else {
                    res.json({
                        success: true,
                        result: order,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.getOrderByPreparator = async function(req, res, next) {
    const {
        id_preparator
    } = req.body;

    if (!id_preparator){
        res.json({
            success: false,
            error: "Merci de préciser un preparateur"
        })
    } else {
        await utils.getElementsByX("order_global","id_preparator", id_preparator)
            .then(function(order){
                if (order.length === 0) {
                    res.json({
                        success: true,
                        error: "Aucune commande trouvée",
                        result: order
                    })
                } else {
                    res.json({
                        success: true,
                        result: order,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.getAllOrders = function (req, res, next){
    db.order_global.findAll().then(result => res.json({
        success: true,
        result : result,
    })).catch(error => res.json({
        success : false,
        error : error
    }));
}

exports.createOrder = async (req, res, next) => {
    const {
        id_client,
        id_pharmacy,
        total_price,
        detail,
        products,
        id_prescription
    } = req.body;

    let regex = /{"id_product":\d*,"quantity":\d*}/gm;
    let products_array = [];

    if(typeof products === "string"){
        products.match(regex).forEach(product =>{
            products_array.push(JSON.parse(product));
        })
    } else{
        products.forEach(product => {
            products_array.push(product);
        })
    }

    if(!id_client || !id_pharmacy || !total_price || !products ){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        if(products_array.length > 0){
            db.order_global.create({
                status : "pending",
                detail : detail,
                id_client : id_client,
                id_pharmacy : id_pharmacy,
                total_price : total_price,
                id_prescription: id_prescription
            }).then(new_order => {
                return new_order;
            }).then(async (new_order) =>{
                let data = "{order_id:"+new_order.id+"}";
                let base = await Qrcode.createBase64(data);

                return {
                    order: new_order,
                    order_id: new_order.id,
                    base64: base
                }
            }).then(async (all_data) =>{
                let qrCode = await Qrcode.createQrCode(all_data.order_id, all_data.base64);

                return {
                    order: all_data.order,
                    order_id: qrCode.id_order
                }
            }).then(async (all_data) => {
                let products_final = await OrderDetail.createOrderDetail(products_array, all_data.order_id)

                res.json({
                    success: true,
                    result: all_data.order,
                    products: products_final
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
        db.order_global.destroy({
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
        id_container,
        id_qrcode,
        id_pharmacy,
        total_price,
        id_prescription
    } = req.body;

    if (!order_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.order_global.findOne({
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
                    id_container: (id_container ? id_container : order.id_container),
                    id_qrcode: (id_qrcode ? id_qrcode : order.id_qrcode),
                    id_pharmacy: (id_pharmacy ? id_pharmacy : order.id_pharmacy),
                    id_prescription: (id_prescription ? id_prescription : order.id_prescription),
                    total_price: (total_price ? total_price : order.total_price),
                }).then(async (order_update) =>{
                    if(status && order_update.id_prescription){
                        await db.prescription.update({ status: status }, {where: {id: order_update.id_prescription}});
                    }

                    res.status(200).json({
                        success: true,
                        result: order_update,
                    })
                }).catch(error => res.status(500).json({
                    success: false,
                    error: error,
                }))
            } else {
                res.json({
                    success: false,
                    error: "Commande introuvable",
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
        }));
    }
}
