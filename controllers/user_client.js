const db = require('../models');
const utils = require('./utils');
const bcrypt = require('bcrypt');

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

async function getUserClientByX(my_key, value){
    let client;
    let query = {}

    query[my_key] = value;

    try {
        client =  await db.user_client.findAll({
            where: query,
            attributes: ['id','username','name','lastname','mail','phone','birth','image_url'],
        })
    } catch (e) {
        console.log(e)
    }

    return client;
}

exports.getUserClientById = async function(req, res, next) {
    const {
        user_id
    } = req.body;

    if (!user_id){
        res.json({
            success: false,
            error: "Merci de préciser un id"
        })
    } else {
        await getUserClientByX("id", user_id)
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

exports.getUserClientByUsername = async function (req, res, next) {
    const {
        username
    } = req.body;

    if (!username){
        res.json({
            success: false,
            error: "Merci de préciser un username"
        })
    } else {
        await getUserClientByX("username", username)
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

exports.deleteUserClient = function(req, res, next) {
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

async function createUserClient(name, lastname, username, password, mail, phone, birth, image_url){
    let result;

    try {
        result = await db.user_client.create({
            username: username,
            password: password,
            image_url: image_url,
            mail: mail,
            phone: phone,
            birth: new Date(birth),
            name: name,
            lastname: lastname
        })
    } catch (e) {
        console.log(e)
    }

    return {
        id: result.id,
        username: result.username,
        mail: result.mail,
        phone: result.phone,
        birth: result.birth,
        name: result.name,
        lastname: result.lastname,
    }
}

exports.registerClient = function (req, res, next) {
    const {
        name,
        lastname,
        username,
        password,
        mail,
        phone,
        birth,
        image_url,
    } = req.body;

    if(!name || !lastname || !password || !phone || !mail){ //rajouter birth
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

        db.user_client.findAll({})
            .then(async (result) => {
                if(result.find(user => user.mail === mail)){
                    res.json({
                        success: false,
                        error: "Adresse mail déjà utilisée",
                    })
                } else if (result.find(user => user.username === new_username)){
                    res.json({
                        success: false,
                        error: "Identifiant indisponible, veuillez en renseigner un nouveau",
                    })
                } else {
                    let new_client = await createUserClient(name, lastname, new_username, password, mail, phone, birth, image_url);

                    res.json({
                        success: true,
                        result: new_client,
                    })
                }})
            .catch(error => res.json({
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

        db.user_client.findAll({})
            .then(async (result) =>{
                if(result.find(user => user.mail === mail)){
                    return {success: false, type: "mail"}
                } else if (result.find(user => user.username === new_username)){
                    return {success: false, type: "username"}
                } else {
                    let hash = await utils.bcryptPassword(password);

                    return {success: true, hash: hash}
                }
            }).then(async (data) => {
                if(!data.success){
                    if(data.type === "mail"){
                        res.json({success: false, error: "Adresse mail déjà utilisée"})
                    } else {
                        res.json({success: false, error: "Identifiant indisponible, veuillez en renseigner un nouveau"})
                    }
                } else {
                    let new_client = await createUserClient(name, lastname, new_username, data.hash, mail, phone, birth, image_url);

                    res.json({
                        success: true,
                        result: new_client,
                    })
                }
            }).catch(error => res.json({
                success: false,
                error: error
            }))
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
