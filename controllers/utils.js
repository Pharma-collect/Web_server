const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.validateEmail = function(mail) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

exports.validatePhoneNumber = function(phone_number) {
    let regex = /^(0|(00|\+)33)[67][0-9]{8}$/;
    return regex.test(phone_number);
}

exports.newUsername = function(name, lastname, username) {
    let new_username;
    if (!username){
        new_username = name.concat('.', lastname.replace(/\s/g,"-")).toLowerCase();
    } else {
        new_username = username.replace(/\s/g,"-").toLowerCase();
    }

    return new_username;
}

exports.createToken = function (user) {
    return jwt.sign(
        { id: user.id, username : user.username },
        'emma_le_tchonk',
        { expiresIn: '24h' }
    )
}

exports.bcryptPassword = async function(password) {
    let password_crypt;

    try{
        password_crypt = bcrypt.hash(password, 10);
    } catch (e) {
        console.log(e)
    }

    return password_crypt;
}

exports.getPharmacyByX = async function(my_key, value){
    let pharmacy;
    let query = {}

    query[my_key] = value;

    try {
        pharmacy =  await db.pharmacy.findOne({
            where: query,
        })
    } catch (e) {
        console.log(e)
    }

    return pharmacy;
}
