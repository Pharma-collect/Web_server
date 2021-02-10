const db = require('../models');
const utils = require('./utils');

exports.getPrescriptionById = async function(req, res) {
    const {
        prescription_id
    } = req.body;

    if (!prescription_id){
        res.status(422).json({
            success: true,
            error: "Merci de préciser un id"
        })
    } else {
        await utils.getElementByX("prescription","id", prescription_id)
            .then(function(pres){
                if (!pres) {
                    res.status(204).json({
                        success: true,
                        error: "Cette ordonnance n'existe pas",
                        result: pres
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}

exports.getPrescriptionsByPharmacy = async function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.status(422).json({
            success: true,
            error: "Merci de préciser un id de pharmacie"
        })
    } else {
        await utils.getElementsByX("prescription","id_pharmacy", pharmacy_id)
            .then(function(pres){
                if (pres.length === 0) {
                    res.status(204).json({
                        success: true,
                        error: "Aucune ordonnance correspond à cette pharmacie",
                        result: pres,
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}


exports.getPrescriptionsByClient = async function(req, res) {
    const {
        client_id
    } = req.body;

    if (!client_id){
        res.status(422).json({
            success: true,
            error: "Merci de préciser un id de client"
        })
    } else {
        await utils.getElementsByX("prescription","id_client", client_id)
            .then(function(pres){
                if (pres.length === 0) {
                    res.status(204).json({
                        success: true,
                        error: "Aucune ordonnance correspond à ce client",
                        result: pres,
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}

exports.getPrescriptionsByStatus = async function(req, res) {
    const {
        status
    } = req.body;

    const label = ["pending", "ready", "container", "finish"];

    if (!status || !label.includes(status)){
        res.status(422).json({
            success: true,
            error: "Merci de préciser un statut correct"
        })
    } else {
        await utils.getElementsByX("prescription","status", status)
            .then(function(pres){
                if (pres.length === 0) {
                    res.status(204).json({
                        success: true,
                        error: "Aucune ordonnance correspond à ce statut",
                        result: pres,
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                }
            })
            .catch(error => res.status(500).json({
                success: false,
                error: error
            }));
    }
}

exports.createPrescription = async function(req, res) {
    const {
        id_client,
        id_pharmacy,
        detail,
    } = req.body;

    if (!req.files || !id_client || !id_pharmacy){
        res.status(422).json({
            success: true,
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
                        error: uploadResult.error,
                        info: "error upload"
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

exports.updatePrescription = function(req, res) {
    const {
        id_prescription,
        detail,
        id_preparator,
        id_pharmacy,
        status,
    } = req.body;

    if (!id_prescription){
        res.status(422).json({
            success: true,
            error: "Information manquante"
        })
    } else {
        db.prescription.findOne({
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
                    info: "update"
                }))
            } else {
                res.status(204).json({
                    success: true,
                    error: "Commande introuvable",
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
            info: "find"
        }));
    }
}

exports.deletePrescription = function(req, res) {
    const {
        id_prescription
    } = req.body;

    if (!id_prescription){
        res.status(422).json({
            success: true,
            error: "Veuillez indiquer un id d'ordonnance"
        })
    } else {
        db.prescription.destroy({
            where: {
                id: id_prescription,
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(204).json({
                    success: true,
                    error: "Cette ordonnance n'existe pas.",
                })
            } else {
                res.status(200).json({
                    success: true,
                    result : result
                })
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}
