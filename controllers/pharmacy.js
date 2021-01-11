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

exports.updatePharmacyNameById = function(req, res, next) {
    const {
        pharmacy_id,
        name
    } = req.body;

    if (!pharmacy_id || !name){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.pharmacy.update({name : name},{
            where: {
                id: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
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
            error: "informations erronées"
        }));
    }
}

exports.updatePharmacyShopById = function(req, res, next) {
    const {
        pharmacy_id,
        has_shop
    } = req.body;

    if (!pharmacy_id || !has_shop){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.pharmacy.update({has_shop : has_shop},{
            where: {
                id: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
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
            error: "informations erronées"
        }));
    }
}

exports.updatePharmacyBossById = function(req, res, next) {
    const {
        pharmacy_id,
        boss
    } = req.body;

    if (!pharmacy_id || !boss){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.pharmacy.update({boss : boss},{
            where: {
                id: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
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
            error: "informations erronées"
        }));
    }
}

exports.updatePharmacyPhoneById = function(req, res, next) {
    const {
        pharmacy_id,
        phone
    } = req.body;

    if (!pharmacy_id || !phone){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        db.pharmacy.update({phone : phone},{
            where: {
                id: pharmacy_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: false,
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
            error: "informations erronées"
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

