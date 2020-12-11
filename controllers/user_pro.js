const db = require('../models');
const utils = require('./utils');
const bcrypt = require('bcrypt');

exports.getAllUserPro = function(req, res, next) {
    db.user_pro.findAll({
        attributes: ['id','username', 'pharmacy_id', 'is_admin'],
    }).then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
        success: false,
        error: error
    }));
}

exports.getUserProByPharmacy = function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de pharmacy"
        })
    } else {
        db.user_pro.findAll({
            where: {
                pharmacy_id: pharmacy_id,
            },
            attributes: ['id','username', 'pharmacy_id', 'is_admin'],
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

exports.getUserProByUsername = function(req, res, next) {
    const {
        username
    } = req.body;

    if (!username){
        res.json({
            success: false,
            error: "Merci de préciser un username"
        })
    } else {
        db.user_pro.findAll({
            where: {
                username: username,
            },
            attributes: ['id','username', 'pharmacy_id', 'is_admin'],
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

exports.deleteUserProByUsername = function(req, res, next) {
    const {
        username
    } = req.body;

    if (!username){
        res.json({
            success: false,
            error: "Merci de préciser un identifiant"
        })
    } else {
        db.user_pro.destroy({
            where: {
                username: username,
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

exports.createUserPro = function (req, res, next) {
    const {
        username,
        password,
        pharmacy_id
    } = req.body;

    if( !username || !password){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {

        db.user_pro.findAll({
        }).then(function(result){
            if (result.find(user => user.username === username)){
                res.json({
                    success: true,
                    error: "Identifiant indisponible, veuillez en renseigner un nouveau",
                })
            } else {
                db.user_pro.create({
                    username: username,
                    password: password,
                    pharmacy_id: pharmacy_id,
                    is_admin: 0,
                }).then(function(result){
                    let result_without_password = {
                        id: result.id,
                        username: result.username,
                        pharmacy_id: result.pharmacy_id,
                        is_admin: 0
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

exports.createUserProPostman = function (req, res, next) {
    const {
        username,
        password,
        pharmacy_id
    } = req.body;

    if( !username || !password || !pharmacy_id){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {

        db.user_pro.findAll({
        }).then(function(result){
            if (result.find(user => user.username === username)){
                res.json({
                    success: true,
                    error: "Identifiant indisponible, veuillez en renseigner un nouveau",
                })
            } else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        db.user_pro.create({
                            username: username,
                            password: hash,
                            pharmacy_id: pharmacy_id,
                            is_admin: 0,
                        }).then(function(result){
                            let result_without_password = {
                                id: result.id,
                                username: result.username,
                                pharmacy_id: pharmacy_id,
                                is_admin: 0
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

exports.loginPro = function (req, res, next) {
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

    db.user_pro.findOne({where: { username: username,}})
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
                                pharmacy_id: user.pharmacy_id,
                                token: utils.createToken(user)
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