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

async function getUserProByX(my_key, value){
    let client;
    let query = {}

    query[my_key] = value;

    try {
        client =  await db.user_pro.findAll({
            where: query,
            attributes: ['id','username', 'pharmacy_id', 'is_admin'],
        })
    } catch (e) {
        console.log(e)
    }

    return client;
}

exports.getUserProByPharmacy = async function(req, res, next) {
    const {
        pharmacy_id
    } = req.body;

    if (!pharmacy_id){
        res.json({
            success: false,
            error: "Merci de préciser un id de pharmacy"
        })
    } else {
        await getUserProByX("pharmacy_id", pharmacy_id)
            .then(function(client){
                if (client.length === 0) {
                    res.json({
                        success: false,
                        error: "Cette personne n'existe pas",
                    })
                } else {
                    res.json({
                        success: true,
                        result: client,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.getUserProById = async function(req, res, next) {
    const {
        user_id
    } = req.body;

    if (!username){
        res.json({
            success: false,
            error: "Merci de préciser un username"
        })
    } else {
        await getUserProByX("id", user_id)
            .then(function(client){
                if (client.length === 0) {
                    res.json({
                        success: false,
                        error: "Cette personne n'existe pas",
                    })
                } else {
                    res.json({
                        success: true,
                        result: client,
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}

exports.deleteUserPro = function(req, res, next) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.json({
            success: false,
            error: "Merci de préciser un identifiant"
        })
    } else {
        db.user_pro.destroy({
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

async function createUserPro(username, password, pharmacy_id){
    let result;

    try {
        result = await db.user_pro.create({
            username: username,
            password: password,
            pharmacy_id: pharmacy_id,
            is_admin: 0,
        })
    } catch (e) {
        console.log(e)
    }

    return {
        id: result.id,
        username: result.username,
        pharmacy_id: result.pharmacy_id,
        is_admin: 0
    }

}

exports.registerPro = function (req, res, next) {
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
        }).then(async (result) => {
            if (result.find(user => user.username === username)){
                res.json({
                    success: true,
                    error: "Identifiant indisponible, veuillez en renseigner un nouveau",
                })
            } else {
                let new_pro = await createUserPro(username, password, pharmacy_id);

                res.json({
                    success: true,
                    result: new_pro,
                })
            }
        }).catch(error => res.json({
            success: false,
            error: error
        }));
    }
}

exports.registerProPostman = function (req, res, next) {
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
        }).then(async (result)=> {
            if (result.find(user => user.username === username)){
                return {success: false}
            } else {
                let hash = await utils.bcryptPassword(password);

                return {success: true, hash: hash}
            }
        }).then(async (data) => {
            if(!data.success){
                res.json({success: false, error: "Identifiant indisponible, veuillez en renseigner un nouveau"})
            } else {
                let new_pro = await createUserPro(username, data.hash, pharmacy_id);

                res.json({
                    success: true,
                    result: new_pro,
                })
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
