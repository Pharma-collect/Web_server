const db = require('../models');
const utils = require('./utils');
const bcrypt = require('bcrypt');

exports.getAllUserClient = function(req, res) {
    db.user_client.findAll({
        attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
    }).then(result => res.status(200).json({
        success: true,
        result: result,
    })).catch(error => res.status(500).json({
        success: false,
        error: error
    }));
}

exports.getUserClientById = function(req, res) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.user_client.findOne({
            where: {
                id: user_id,
            },
            attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
        }).then(function(result){
            if (result.length === 0){
                res.status(204).json({
                    success: true,
                    error: "Cette personne n'existe pas",
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

exports.getUserClientByUsername = function(req, res) {
    const {
        username
    } = req.body;

    if (!username){
        res.status(422).json({
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
                res.status(204).json({
                    success: true,
                    error: "Cette personne n'existe pas",
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

exports.deleteUserClientById = function(req, res) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.user_client.destroy({
            where: {
                id: user_id,
            }
        }).then(function(result){
            res.status(200).json({
                success: true,
                result: result,
            })
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}

exports.registerClient = function (req, res) {
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
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else if(!utils.validateEmail(mail)){
        res.status(1001).json({
            success: false,
            error: "Mail invalide"
        })
    } else if(!utils.validatePhoneNumber(phone)){
        res.status(1002).json({
            success: false,
            error: "Numéro de téléphone invalide"
        })
    } else {
        let new_username = utils.newUsername(name, lastname, username);

        db.user_client.findAll({
        }).then(function(result){
            if(result.find(user => user.mail === mail)){
                res.status(1003).json({
                    success: false,
                    error: "Adresse mail déjà utilisée",
                })
            } else if (result.find(user => user.username === new_username)){
                res.status(1004).json({
                    success: false,
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

                    res.status(200).json({
                        success: true,
                        result: result_without_password,
                    })
                }).catch(error => res.status(500).json({
                    success: false,
                    error: error,
                    info: "create"
                }));
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error,
            info: "find"
        }));
    }
}

exports.registerClientPostman = function (req, res) {
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
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else if(!utils.validateEmail(mail)){
        res.status(1001).json({
            success: false,
            error: "Mail invalide"
        })
    } else if(!utils.validatePhoneNumber(phone)){
        res.status(1002).json({
            success: false,
            error: "Numéro de téléphone invalide"
        })
    } else {
        let new_username = utils.newUsername(name, lastname, username);

        db.user_client.findAll({
        }).then(function(result){
            if(result.find(user => user.mail === mail)){
                res.status(1003).json({
                    success: false,
                    error: "Adresse mail déjà utilisée",
                })
            } else if (result.find(user => user.username === new_username)){
                res.status(1004).json({
                    success: false,
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

                            res.status(200).json({
                                success: true,
                                result: result_without_password,
                            })
                        }).catch(error => res.status(500).json({
                            success: false,
                            error: error,
                            info: "create"
                        }));
                    })
                    .catch(error => res.status(500).json({
                        success: false,
                        error: error,
                        info: "hash"
                    }))
            }
        }).catch(error => res.status(500).json({
            success: false,
            error: error
        }));
    }
}

exports.loginClient = function (req, res) {
    const {
        username,
        password,
    } = req.body;

    if(!username || !password){
        res.status(422).json({
            success: false,
            error: "Veuillez remplir tout les champs",
        })
    }

    db.user_client.findOne({where: { username: username,}})
        .then(user => {
            if(!user){
                res.status(401).json({
                    success: false,
                    error: "Identifiant incorrect",
                })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isValid => {
                        if (!isValid) {
                            res.status(401).json({
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
                                token: utils.createToken(user)
                            }
                            res.status(200).json({
                                success: true,
                                result: valid_user,
                            })
                        }
                    })
                    .catch(error => res.status(500).json({
                        success: false,
                        error: error,
                        info: "compare"
                        })
                    );
            }
        })
        .catch(error => res.status(500).json({
                success: false,
                error: error,
                info: "find"
            })
        );
}
