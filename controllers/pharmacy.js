const db = require('../models');

async function getPharmacyByX(my_key, value){
    let pharmacy;
    let query = {}

    query[my_key] = value;

    try {
        pharmacy =  await db.pharmacy.findAll({
            where: query,
        })
    } catch (e) {
        console.log(e)
    }

    return pharmacy;
}

exports.getPharmacyById = async function(req, res, next) {
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

exports.getPharmacyByName = async function(req, res, next) {
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

exports.getPharmacyByCity = async function(req, res, next) {
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

exports.getPharmacyByPostCode = async function(req, res, next) {
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

exports.getPharmacyByBoss = async function(req, res, next) {
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

exports.deletePharmacyById = async function(req, res, next) {
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

exports.deletePharmacyByBoss = async function(req, res, next) {
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

