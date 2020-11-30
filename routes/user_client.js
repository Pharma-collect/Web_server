const express = require('express')
const router = express.Router();
const db = require('../models');

router.get('/getAllUserClient', function(req, res, next) {
    db.user_client.findAll().then(result => res.json({
        success: true,
        result: result,
    })).catch(error => res.json({
            success: false,
            error: error
    }));
});

router.get('/getUserClientById', function(req, res, next) {
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
});

router.get('/getUserClientByUsername', function(req, res, next) {
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
});

router.post('/createUserClient', (req, res, next) => {
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
    } else if(!validateEmail(mail)){
        res.json({
            success: false,
            error: "Mail invalide"
        })
    } else if(!validatePhoneNumber(phone)){
        res.json({
            success: false,
            error: "Numéro de téléphone invalide"
        })
    } else {
        let new_username = newUsername(name, lastname, username);

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
                    error: "Username indisponible, veuillez en renseigner un nouveau",
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
});

router.post('/deleteUserClientById', function(req, res, next) {
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
});

module.exports = router;



//voir si on ne met pas les fonctions autre part

function validateEmail(mail) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

function validatePhoneNumber(phone_number) {
    let regex = /^(0|(00|\+)33)[67][0-9]{8}$/;
    return regex.test(phone_number);
}

function newUsername(name, lastname, username){
    let new_username;
    if (!username){
        new_username = name.concat('.', lastname.replace(/\s/g,"-")).toLowerCase();
    } else {
        new_username = username.replace(/\s/g,"-").toLowerCase();
    }

    return new_username;
}
