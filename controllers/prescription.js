const db = require('../models');
const utils = require('./utils');

exports.createPrescription = async function(req, res, next) {
    const {
        id_client,
        id_pharmacy,
        detail,
    } = req.body;

    if (!req.files || !id_client || !id_pharmacy){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        await utils.uploadMedia(req.files, "prescription")
            .then(function(uploadResult){
                if(uploadResult.success){
                    return uploadResult.url;
                }else{
                    res.status(uploadResult.errorCode).json({
                        success: false,
                        error: uploadResult.error
                    })
                }
            })
            .then(async (url) => {
                try {
                    let pres = await db.prescription.create({
                        id_client : id_client,
                        id_pharmacy : id_pharmacy,
                        detail: detail,
                        image_url: url,
                        status: "pending",
                    })

                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                } catch (e) {
                    res.status(500).json({
                        success: false,
                        error: "erreur creation db",
                        info: e
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}

exports.updatePrescription = function(req, res, next) {
    const {
        id_prescription,
        detail,
        id_preparator,
        id_pharmacy,
        status,
    } = req.body;

    if (!id_prescription){
        res.json({
            success: false,
            error: "Information manquante"
        })
    } else {
        db.order.findOne({
            where: {
                id: id_prescription,
            }
        }).then(prescription => {
            if(prescription){
                prescription.update({
                    detail: (detail ? detail : prescription.detail),
                    id_preparator: (id_preparator ? id_preparator : prescription.id_preparator),
                    id_pharmacy: (id_pharmacy ? id_pharmacy : prescription.id_pharmacy),
                    status: (status ? status : prescription.status),
                }).then(order_update =>res.status(200).json({
                    success: true,
                    result: order_update,
                })).catch(error => res.status(500).json({
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

exports.deletePrescription = function(req, res, next) {
    const {
        id_prescription
    } = req.body;

    if (!id_prescription){
        res.json({
            success: false,
            error: "Veuillez indiquer un id d'ordonnance"
        })
    } else {
        db.prescription.destroy({
            where: {
                id: id_prescription,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette ordonnance n'existe pas.",
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
