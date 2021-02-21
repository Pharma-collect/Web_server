const db = require('../models');
const utils = require('./utils');
const bcrypt = require('bcrypt');

exports.getAllUserPro = function(req, res) {
    db.user_pro.findAll({
        attributes: ['id','username', 'pharmacy_id', 'is_admin'],
    }).then(result => res.status(200).json({
        success: true,
        result: result,
    })).catch(error => res.status(500).json({
        success: false,
        error: error
    }));
}

exports.getUserProByPharmacy = function(req, res) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.status(422).json({
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
                res.status(200).json({
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

exports.getUserProById = function(req, res) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        db.user_pro.findOne({
            where: {
                id: user_id,
            },
            attributes: ['id','username', 'pharmacy_id', 'is_admin'],
        }).then(function(result){
            if (result.length === 0){
                res.status(200).json({
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

exports.deleteUserProById = function(req, res) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.status(422).json({
            success: false,
            error: "Merci de préciser un identifiant"
        })
    } else {
        db.user_pro.destroy({
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

exports.createUserPro = function (req, res) {
    const {
        username,
        password,
        pharmacy_id
    } = req.body;

    if( !username || !password){
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else {

        db.user_pro.findAll({
        }).then(function(result){
            if (result.find(user => user.username === username)){
                res.status(1004).json({
                    success: false,
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

exports.createUserProPostman = function (req, res) {
    const {
        username,
        password,
        pharmacy_id
    } = req.body;

    if( !username || !password || !pharmacy_id){
        res.status(422).json({
            success: false,
            error: "Informations manquantes"
        })
    } else {

        db.user_pro.findAll({
        }).then(function(result){
            if (result.find(user => user.username === username)){
                res.status(1004).json({
                    success: false,
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
        }).catch(error => res.status(200).json({
            success: false,
            error: error,
            info: "find"
        }));
    }
}

exports.loginPro = function (req, res) {
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

    db.user_pro.findOne({where: { username: username,}})
        .then(user => {
            if(!user){
                res.status(401).json({
                    success: false,
                    error: "Identifiant incorrect",
                })
            } else {
                bcrypt.compare(password, user.password)
                    .then(async (isValid) => {

                        if (!isValid) {
                            res.status(401).json({
                                success: false,
                                error: "Mot de Passe incorrect",
                            })
                        } else {
                            let pharma = await utils.getElementByX("pharmacy","id", user.pharmacy_id);

                            let valid_user = {
                                id: user.id,
                                username: user.username,
                                is_admin: user.is_admin,
                                token: utils.createToken(user),
                                pharmacy: pharma
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
                            info: "compare bcrypt"
                        })
                    );
            }
        })
        .catch(error => res.status(500).json({
                success: false,
                error: error,
                info: "check id"
            })
        );
}
