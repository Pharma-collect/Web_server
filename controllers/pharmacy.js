const db = require('../models');

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
        db.pharmacy.findAll({
            where: {
                id: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette pharmacie n'existe pas",
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
        db.pharmacy.findAll({
            where: {
                name: name,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette pharmacie n'existe pas",
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
        db.pharmacy.findAll({
            where: {
                city: city,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune pharmacie n'existe dans cette ville",
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
        db.pharmacy.findAll({
            where: {
                post_code: post_code,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune pharmacie n'existe pour ce code postal",
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
        db.pharmacy.findAll({
            where: {
                boss: boss,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune pharmacie n'existe pour ce patron",
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
                error: "Informations erronées"
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
        db.pharmacy.destroy({
            where: {
                id: pharmacy_id,

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
        db.pharmacy.destroy({
            where: {
                boss: boss,

            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Aucune pharmacie avec ce patron n'existe.",
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

