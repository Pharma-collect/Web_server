const db = require('../models');
const utils = require('./utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUserClient = function(req, res, next) {
    db.user_client.findAll({
        attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
    }).then(result => res.json({
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
            },
            attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
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
            },
            attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
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

exports.registerClient = function (req, res, next) {
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
                    let result_without_password = {
                        id: result.id,
                        username: result.username,
                        mail: result.mail,
                        phone: result.phone,
                        birth: result.birth,
                        name: result.name,
                        lastname: result.lastname,
                    };

                    res.json({
                        success: true,
                        result: result_without_password,
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

exports.registerClientPostman = function (req, res, next) {
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
                bcrypt.hash(password, 10)
                    .then(hash => {
                        db.user_client.create({
                            username: new_username,
                            password: hash,
                            image_url: image_url,
                            mail: mail,
                            phone: phone,
                            birth: new Date(birth),
                            name: name,
                            lastname: lastname
                        }).then(function(result){
                            let result_without_password = {
                                id: result.id,
                                username: result.username,
                                mail: result.mail,
                                phone: result.phone,
                                birth: result.birth,
                                name: result.name,
                                lastname: result.lastname,
                            };

                            res.json({
                                success: true,
                                result: result_without_password,
                            })
                        }).catch(error => res.json({
                            success: false,
                            error: error
                        }));
                    })
                    .catch(error => res.json({
                        success: false,
                        error: error
                    }))
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.loginClient = function (req, res, next) {
    const {
        username,
        password,
    } = req.body;

    if(!username || !password){
        res.json({
            success: false,
            error: "Veuillez remplir tout les champs",
        })
    }

    db.user_client.findOne({where: { username: username,}})
        .then(user => {
            if(!user){
                res.json({
                    success: false,
                    error: "Identifiant incorrect",
                })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isValid => {
                        if (!isValid) {
                            res.json({
                                success: false,
                                error: "Mot de Passe incorrect",
                            })
                        } else {
                            let valid_user = {
                                id: user.id,
                                username: user.username,
                                name: user.name,
                                lastname: user.lastname,
                                mail: user.mail,
                                phone: user.phone,
                                birth: user.birth,
                                image_url: user.image_url,
                                token: "token",
                            }
                            res.json({
                                success: true,
                                result: valid_user,
                            })
                        }
                    })
                    .catch(error => res.json({
                        success: false,
                        error: error
                        })
                    );
            }
        })
        .catch(error => res.json({
                success: false,
                error: error
            })
        );
}
