const db = require('../models');

exports.getContainerById = function(req, res) {
    const {
        container_id
    } = req.body;

    if (!container_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.container.findOne({
            where: {
                id: container_id,
            }
        }).then(function(result){
            if (!result){
                res.status(200).json({
                    success: true,
                    error: "Ce container n'existe pas",
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

exports.getContainerByPharmacy = function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id de pharmacie"
        })
    } else {
        db.container.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
                    success: true,
                    error: "Cette pharmacie n'existe pas ou n'a pas de containers.",
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

exports.getEmptyContainerByPharmacy = function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id de pharmacie"
        })
    } else {
        db.container.findAll({
            where: {
                id_pharmacy: pharmacy_id,
                status : 0
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
                    success: true,
                    error: "Cette pharmacie n'existe pas ou n'a pas de containers vides.",
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

exports.getAllContainers = function(req, res) {
    db.container.findAll({
    }).then(function(result){
        if (result.length === 0){
            res.status(200).json({
                success: true,
                error: "Il n'existe pas de containers",
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

exports.addXContainerToPharmacy = (req, res) => {
    const {
        nb_of_containers,
        pharmacy_id,
    } = req.body;

    if(!pharmacy_id || !nb_of_containers){
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.container.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(async function(result){
            await createContainer(pharmacy_id, result, nb_of_containers)
                .then(function(containers_tab){
                    res.status(200).json({
                        success: true,
                        result: containers_tab,
                    })
                })
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}

async function createContainer(pharmacy_id, containers_already_here, number){
    let tab=[];

    for(let i = (containers_already_here.length +1); i<= parseInt(containers_already_here.length + parseInt(number)); i++)
    {
        tab.push(await db.container.create({
            status : 0,
            container_number : i,
            id_pharmacy : pharmacy_id
        }))
    }

    return tab
}

exports.updateContainer = function(req, res) {
    const {
        container_id,
        status
    } = req.body;

    if (!container_id || !status){
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.container.update({status : status},{
            where: {
                id: container_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
                    success: true,
                    error: "Ce container n'existe pas.",
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

exports.deleteContainerById = function(req, res) {
    const {
        container_id
    } = req.body;

    if (!container_id){
        res.status(422).json({
            success: false,
            error: "Veuillez indiquer un id de container"
        })
    } else {
        db.container.destroy({
            where: {
                id: container_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
                    success: true,
                    error: "Ce container n'existe pas.",
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

exports.deleteAllContainersFromPharma = function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Veuillez indiquer un id de pharmacie"
        })
    } else {
        db.container.destroy({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
                    success: true,
                    error: "Cette pharmacie n'a pas de containers.",
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
