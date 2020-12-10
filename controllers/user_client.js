const db = require('../models');
const utils = require('./utils');

exports.getAllUserClient = function(req, res, next) {
    db.user_client.findAll().then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
        success: false,
        error: error
    }));
}

exports.getUserClientById = function(req, res, next) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.user_client.findAll({
            where: {
                id: user_id,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette personne n'existe pas",
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

exports.getUserClientByUsername = function(req, res, next) {
    const {
        username
    } = req.body;

    if (!username){
        res.json({
            success: false,
            error: "Merci de préciser un username"
        })
    } else {
        db.user_client.findAll({
            where: {
                username: username,
            }
        }).then(function(result){
            if (result.length === 0){
                res.json({
                    success: true,
                    error: "Cette personne n'existe pas",
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

exports.deleteUserClientById = function(req, res, next) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.user_client.destroy({
            where: {
                id: user_id,
            }
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
}

exports.createUserClient = function (req, res, next) {
    const {
        username,
        password,
        image_url,
        mail,
        phone,
        birth,
        name,
        lastname
    } = req.body;

    if(!name || !lastname || !birth || !password || !phone || !mail){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else if(!utils.validateEmail(mail)){
        res.json({
            success: false,
            error: "Mail invalide"
        })
    } else if(!utils.validatePhoneNumber(phone)){
        res.json({
            success: false,
            error: "Numéro de téléphone invalide"
        })
    } else {
        let new_username = utils.newUsername(name, lastname, username);

        db.user_client.findAll({
        }).then(function(result){
            if(result.find(user => user.mail === mail)){
                res.json({
                    success: true,
                    error: "Adresse mail déjà utilisée",
                })
            } else if (result.find(user => user.username === new_username)){
                res.json({
                    success: true,
                    error: "Identifiant indisponible, veuillez en renseigner un nouveau",
                })
            } else {
                db.user_client.create({
                    username: new_username,
                    password: password,
                    image_url: image_url,
                    mail: mail,
                    phone: phone,
                    birth: new Date(birth),
                    name: name,
                    lastname: lastname
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
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}
