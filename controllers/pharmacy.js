const db = require('../models');

function getPharmacyByX(key, value, text_error){
    db.pharmacy.findAll({
        where: {
            key: value,
        }
    }).then(function(result){
        if (!result){
            res.json({
                success: false,
                error: text_error,
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

exports.getPharmacyById = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        getPharmacyByX("id", pharmacy_id, "Cette pharmacie n'existe pas")
    }
}

exports.getPharmacyByName = function(req, res, next) {
    const {
        name
    } = req.body;

    if (!name){
        res.json({
            success: false,
            error: "Merci de préciser un nom"
        })
    } else {
        getPharmacyByX("name", name, "Cette pharmacie n'existe pas")
    }
}

exports.getPharmacyByCity = function(req, res, next) {
    const {
        city
    } = req.body;

    if (!city){
        res.json({
            success: false,
            error: "Merci de préciser une ville"
        })
    } else {
        getPharmacyByX("city", city, "Aucune pharmacie n'existe dans cette ville")
    }
}

exports.getPharmacyByPostCode = function(req, res, next) {
    const {
        post_code
    } = req.body;

    if (!post_code){
        res.json({
            success: false,
            error: "Merci de préciser une code postal"
        })
    } else {
        getPharmacyByX("post_code", post_code, "Aucune pharmacie n'existe pour ce code postal")
    }
}

exports.getPharmacyByBoss = function(req, res, next) {
    const {
        boss
    } = req.body;

    if (!boss){
        res.json({
            success: false,
            error: "Merci de préciser une code postal"
        })
    } else {
        getPharmacyByX("boss", boss, "Aucune pharmacie n'existe pour ce patron")
    }
}

exports.getPharmacyWithShop = function(req, res, next) {
    db.pharmacy.findAll({
        where: {
            has_shop: 1,
        }
    }).then(function(result){
        if (result.length === 0){
            res.json({
                success: true,
                error: "Aucune pharmacie avec shop n'existe",
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

exports.getPharmacyWithoutShop = function(req, res, next) {
    db.pharmacy.findAll({
        where: {
            has_shop: 0,
        }
    }).then(function(result){
        if (result.length === 0){
            res.json({
                success: true,
                error: "Aucune pharmacie sans shop n'existe",
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


exports.createPharmacy = function(req, res, next) {
    const {
        name, 
        has_shop,
        road_nb,
        road,
        phone, 
        post_code, 
        city, 
        boss
    } = req.body;

    if (!name || !has_shop || !road_nb || !road || !phone || !post_code || !city || !boss){
        res.json({
            success: false,
            error: "Données manquantes"
        })
    } else {
        db.pharmacy.create({
            name: name,
            has_shop: has_shop,
            road_nb : road_nb,
            road : road,
            phone : phone,
            post_code : post_code,
            city : city,
            boss : boss
        }).then(function(result){
            res.json({
                success: true,
                result: result,
            })
        }).catch(error => res.json({
            success: false,
            error: "Informations erronées",
            info: error
        }));
    }
}

exports.updatePharmacy = function(req, res, next) {
    const {
        pharmacy_id,
        name,
        has_shop,
        road_nb,
        road,
        phone,
        post_code,
        city,
        boss
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Veuillez préciser une pharmacie"
        })
    } else {
        db.pharmacy.findOne({
            where: {
                id: pharmacy_id
            }
        }).then(pharmacy => {
            if(pharmacy){
                pharmacy.update({
                    name: (name ? name : pharmacy.name),
                    has_shop: (has_shop ? has_shop : pharmacy.has_shop),
                    road_nb: (road_nb ? road_nb : pharmacy.road_nb),
                    road: (road ? road : pharmacy.road),
                    phone: (phone ? phone : pharmacy.phone),
                    post_code: (post_code ? post_code : pharmacy.post_code),
                    city: (city ? city : pharmacy.city),
                    boss: (boss ? boss : pharmacy.boss),
                }).then(pharmacy_update =>res.json({
                    success: true,
                    result: pharmacy_update,
                })).catch(error => res.json({
                    success: false,
                    error: "informations erronées",
                    info: error
                }));
            } else {
                res.json({
                    success: true,
                    error: "Pharmacie introuvable",
                    result: pharmacy,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: "informations erronées",
            info: error
        }));
    }
}

function deletePharmacyByX(key, value){
    db.pharmacy.destroy({
        where: {
            key: value,
        }
    }).then(function(result){
        if (result.length === 0){
            res.json({
                success: true,
                error: "Cette pharmacie n'existe pas.",
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

exports.deletePharmacyById = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Veuillez indiquer un id de pharmacie"
        })
    } else {
        deletePharmacyByX("id", pharmacy_id)
    }
}

exports.deletePharmacyByBoss = function(req, res, next) {
    const {
        boss
    } = req.body;

    if (!boss){
        res.json({
            success: false,
            error: "Veuillez indiquer un patron"
        })
    } else {
        deletePharmacyByX("boss", boss)
    }
}
