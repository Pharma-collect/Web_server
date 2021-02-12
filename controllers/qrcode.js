const QRCode= require('qrcode');
const db = require('../models');
const fs = require('fs');

exports.createBase64 = async function(data){
    let base;

    try {
        base = await QRCode.toDataURL(data);
    } catch (e) {
        console.log(e)
    }

    return base;
}

exports.createQrCode = async function(order_id, base64){
    let qrCode;

    base64_decode(base64,'./uploads/qrcode/qrcode_'+order_id+'.png')

    try {
        qrCode = await db.qrcode.create({id_order : order_id, data : "https://88-122-235-110.traefik.me:61001/api/get_file/qrcode/qrcode_"+order_id+".png"});
    } catch (e) {
        console.log(e)
    }

    return qrCode;
}

function base64_decode(base64String, file) {
    let base64Image = base64String.split(';base64,').pop();

    fs.writeFile(file, base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
}
