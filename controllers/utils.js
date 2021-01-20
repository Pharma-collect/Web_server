const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const path = require('path');

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

exports.uploadMedia = async function(files, filetype) {

    if (!files || Object.keys(files).length === 0) {
        return {
            errorCode: 500,
            success: false,
            error: "No files were uploaded."
        };
    }

    let targetFile = files.file;
    let extName = path.extname(targetFile.name);
    let baseName = path.basename(targetFile.name, extName);

    let imgList = ['.png','.jpg','.jpeg','.gif'];
    // Checking the file type
    if(!imgList.includes(extName)){
        fs.unlinkSync(targetFile.tempFilePath);

        return {
            errorCode: 422,
            success: false,
            error: "Invalid Image"
        };
    }

    if(targetFile.size > 1048576){
        fs.unlinkSync(targetFile.tempFilePath);

        return {
            errorCode: 413,
            success: false,
            error: "File too large"
        };
    }

    let num = 1;
    let pathUpload= ''
    let uploadDir =''
    let filetypeIsValid = true

    switch(filetype){
        case 'product':
            pathUpload = '../uploads/product'

            break;

        case 'avatar':
            pathUpload = '../uploads/avatar'
            break;

        case 'prescription':
            pathUpload = '../uploads/prescription'
            break;

        default:
            filetypeIsValid = false

    }

    uploadDir = path.join(__dirname, pathUpload, targetFile.name);

    if(filetypeIsValid){
        while(fs.existsSync(uploadDir)){
            uploadDir = path.join(__dirname, pathUpload , baseName + '-' + num + extName);
            num++;
        }

        const pathFile = uploadDir.split('/')
        const url='https://88-122-235-110.traefik.me:61001/api/get_file/'

        try{
            await targetFile.mv(uploadDir);

            return {
                errorCode: 200,
                success: true,
                url: url + filetype + '/' + pathFile[pathFile.length -1],
            };
        }catch (err) {
            return {
                errorCode: 500,
                success: false,
                error: err
            };
        }
    }
    else{
        return {
            errorCode: 500,
            success: false,
            error: "Filetype is invalid. Must be 'product/prescription/avatar'"
        };
    }
}
