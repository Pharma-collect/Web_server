const db = require('../models');

exports.getContainerById = function(req, res, next) {
    const {
        container_id
    } = req.body;

    if (!container_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.container.findAll({
            where: {
                id: container_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce container n'existe pas",
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

exports.getContainerByPharmacy = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
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
                res.json({
                    success: true,
                    error: "Cette pharmacie n'existe pas ou n'a pas de containers.",
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

exports.getEmptyContainerByPharmacy = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
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
                res.json({
                    success: true,
                    error: "Cette pharmacie n'existe pas ou n'a pas de containers vides.",
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

exports.getContainerStatusById = function(req, res, next) {
    const {
        container_id
    } = req.body;

    if (!container_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de container"
        })
    } else {
        db.container.findAll({
            where: {
                id: container_id,

            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce container n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    status: result.find(container => container.id === parseInt(container_id)).status,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.getContainerNumberById = function(req, res, next) {
    const {
        container_id,
    } = req.body;

    if (!container_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de container"
        })
    } else {
        db.container.findAll({
            where: {
                id: container_id,

            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce container n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    container_number: result.find(container => container.id === parseInt(container_id)).container_number,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.getContainerPharmacyById = function(req, res, next) {
    const {
        container_id,
    } = req.body;

    if (!container_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de container"
        })
    } else {
        db.container.findAll({
            where: {
                id: container_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Ce container n'existe pas.",
                })
            } else {
                res.json({
                    success: true,
                    id_pharmacy : result.find(container => container.id === parseInt(container_id)).id_pharmacy,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.getAllContainers = function(req, res, next) {
    allContainers(req, res);
}

exports.addXContainerToPharmacy = (req, res, next) => {
    const {
        nb_of_containers,
        pharmacy_id,
    } = req.body;

    if(!pharmacy_id || !nb_of_containers){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.container.findAll({
            where: {
                id_pharmacy: pharmacy_id,
            }
        }).then(function(result){
            
                for(var i = (result.length +1); i<= parseInt(result.length + parseInt(nb_of_containers)); i++)
                {
                    createContainer(req, res, i, pharmacy_id);
                }

        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.updateContainerStatusById = function(req, res, next) {
    const {
        container_id,
        status
    } = req.body;

    if (!container_id || !status){
        res.json({
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
                res.json({
                    success: true,
                    error: "Ce container n'existe pas.",
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

exports.deleteContainerById = function(req, res, next) {
    const {
        container_id
    } = req.body;

    if (!container_id){
        res.json({
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
                res.json({
                    success: true,
                    error: "Ce container n'existe pas.",
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

exports.deleteAllContainersFromPharma = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
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
                res.json({
                    success: true,
                    error: "Cette pharmacie n'a pas de containers.",
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

function createContainer(req, res, number, pharmacy_id){
    db.container.create({
        status : 0,
        container_number : number,
        id_pharmacy :pharmacy_id
    }).then(function(result){
        res.json({
            success: true,
            result: result,
        })
    }).catch(error => res.json({
        success: false,
        error: error
    }));
}

function allContainers(req, res){
    db.container.findAll({
    }).then(function(result){
        if (result.length === 0){
            res.json({
                success: true,
                error: "Il n'existe pas de containers",
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