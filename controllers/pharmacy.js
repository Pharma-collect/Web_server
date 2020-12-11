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
