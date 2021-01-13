const QRCode= require('qrcode');
const db = require('../models');

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

    try {
        qrCode = await db.qrcode.create({id_order : order_id, data : base64});
    } catch (e) {
        console.log(e)
    }

    return qrCode;
}
