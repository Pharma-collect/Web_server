const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const nodeMailer = require('nodemailer');

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
        case 'qrcode':
            pathUpload = '../uploads/qrcode'
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
                info: err,
                error: "error mv"
            };
        }
    }
    else{
        return {
            errorCode: 500,
            success: false,
            error: "Filetype is invalid. Must be 'product/prescription/avatar/qrcode'"
        };
    }
}

exports.getElementByX = async function(table, key, value) {
    let element;

    try {
        element = await db.sequelize.query(
            "SELECT * \n" +
            "FROM "+table+" \n"+
            "WHERE "+key+" = "+value+"\n", { type: QueryTypes.SELECT }
        );
    } catch (e) {
        console.log(e)
    }

    if(element.length > 0){
        return element[0]
    } else {
        return null
    }
}

exports.getElementsByX = async function(table, key, value) {
    let elements = [];

    try {
        elements = await db.sequelize.query(
            "SELECT * \n" +
            "FROM "+table+" \n"+
            "WHERE "+key+" = "+value+"\n", { type: QueryTypes.SELECT }
        );
    } catch (e) {
        console.log(e)
    }

    return elements
}

exports.mailSender = async function(receiver, receiver_name, pharma_name, order_id, isFinish){
    if(process.env.MAIL_USER && process.env.MAIL_PASSWORD){
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let qrcodePath = "https://88-122-235-110.traefik.me:61001/api/get_file/qrcode/qrcode_"+order_id+".png";
        let htmlContent = createHTML(isFinish, receiver_name);
        let subject;
        if(isFinish){
            subject = "Votre commande est prête";
        } else{
            subject = "Confirmation de commande";
        }


        let mailOptions = {
            from: pharma_name+' <pharmacollect@gmail.com>', // sender address
            to: receiver,
            subject: subject,
            attachments: [
                {
                    filename: 'votre_qr_code.png',
                    path: qrcodePath
                }
            ],
            html: htmlContent
        };

        transporter.sendMail(mailOptions)
            .then(info => {
                console.log('Message %s sent: %s', info.messageId, info.response);
            })
            .catch(error => {
                console.log(error)
            });
    }
}

function createHTML(isFinish, client_name){
    if(isFinish){
        return ('<!DOCTYPE html PUBLIC>\n' +
            '\n' +
            '<html>\n' +
            '<head>\n' +
            '\t<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>\n' +
            '\t<meta content="width=device-width" name="viewport"/>\n' +
            '\t<title></title>\n' +
            '\t<style type="text/css">\n' +
            '\tbody {\n' +
            '\t\tmargin: 0;\n' +
            '\t\tpadding: 0;\n' +
            '\t}\n' +
            '\n' +
            '\ttable,\n' +
            '\ttd,\n' +
            '\ttr {\n' +
            '\t\tvertical-align: top;\n' +
            '\t\tborder-collapse: collapse;\n' +
            '\t}\n' +
            '\n' +
            '\t* {\n' +
            '\t\tline-height: inherit;\n' +
            '\t}\n' +
            '\n' +
            '\ta[x-apple-data-detectors=true] {\n' +
            '\t\tcolor: inherit !important;\n' +
            '\t\ttext-decoration: none !important;\n' +
            '\t}\n' +
            '</style>\n' +
            '<style id="media-query" type="text/css">\n' +
            '@media (max-width: 620px) {\n' +
            '\n' +
            '\t.block-grid,\n' +
            '\t.col {\n' +
            '\t\tmin-width: 320px !important;\n' +
            '\t\tmax-width: 100% !important;\n' +
            '\t\tdisplay: block !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.block-grid {\n' +
            '\t\twidth: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.col {\n' +
            '\t\twidth: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.col_cont {\n' +
            '\t\tmargin: 0 auto;\n' +
            '\t}\n' +
            '\n' +
            '\timg.fullwidth,\n' +
            '\timg.fullwidthOnMobile {\n' +
            '\t\tmax-width: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col {\n' +
            '\t\tmin-width: 0 !important;\n' +
            '\t\tdisplay: table-cell !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack.two-up .col {\n' +
            '\t\twidth: 50% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num2 {\n' +
            '\t\twidth: 16.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num3 {\n' +
            '\t\twidth: 25% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num4 {\n' +
            '\t\twidth: 33% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num5 {\n' +
            '\t\twidth: 41.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num6 {\n' +
            '\t\twidth: 50% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num7 {\n' +
            '\t\twidth: 58.3% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num8 {\n' +
            '\t\twidth: 66.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num9 {\n' +
            '\t\twidth: 75% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num10 {\n' +
            '\t\twidth: 83.3% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.video-block {\n' +
            '\t\tmax-width: none !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.mobile_hide {\n' +
            '\t\tmin-height: 0px;\n' +
            '\t\tmax-height: 0px;\n' +
            '\t\tmax-width: 0px;\n' +
            '\t\tdisplay: none;\n' +
            '\t\toverflow: hidden;\n' +
            '\t\tfont-size: 0px;\n' +
            '\t}\n' +
            '\n' +
            '\t.desktop_hide {\n' +
            '\t\tdisplay: block !important;\n' +
            '\t\tmax-height: none !important;\n' +
            '\t}\n' +
            '}\n' +
            '</style>\n' +
            '<style id="icon-media-query" type="text/css">\n' +
            '@media (max-width: 620px) {\n' +
            '\t.icons-inner {\n' +
            '\t\ttext-align: center;\n' +
            '\t}\n' +
            '\n' +
            '\t.icons-inner td {\n' +
            '\t\tmargin: 0 auto;\n' +
            '\t}\n' +
            '}\n' +
            '</style>\n' +
            '</head>\n' +
            '<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff;">\n' +
            '\t<table bgcolor="#EAE3DD" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #EAE3DD; width: 100%;" valign="top" width="100%">\n' +
            '\t\t<tbody>\n' +
            '\t\t\t<tr style="vertical-align: top;" valign="top">\n' +
            '\t\t\t\t<td style="word-break: break-word; vertical-align: top;" valign="top">\n' +
            '\t\t\t\t\t<div style="background-color:#ffffff;">\n' +
            '\t\t\t\t\t\t<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">\n' +
            '\t\t\t\t\t\t\t<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">\n' +
            '\t\t\t\t\t\t\t\t<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">\n' +
            '\t\t\t\t\t\t\t\t\t<div class="col_cont" style="width:100% !important;">\n' +
            '\t\t\t\t\t\t\t\t\t\t<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div align="center" class="img-container center fixedwidth" style="padding-right: 15px;padding-left: 15px;">\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size:1px;line-height:15px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://88-122-235-110.traefik.me:61001/assets/img/favicon.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 120px; display: block;" title="Image" width="120"/>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size:1px;line-height:15px"> </div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div style="color:#2c8935;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; text-align: center; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #2c8935; mso-line-height-alt: 14px;"><span style="font-size: 24px;"><span style="font-size: 24px;">Salut '+client_name+' ! Ta commande est prête</span></span></div>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.8;padding-top:0px;padding-right:20px;padding-bottom:0px;padding-left:20px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div class="txtTinyMce-wrapper" style="line-height: 1.8; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #555555; mso-line-height-alt: 22px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 16px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 29px; margin: 0;"><span style="font-size: 16px;">Votre commande est prête à être récupérée  !</span></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"> </p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 16px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 29px; margin: 0;"><span style="font-size: 16px;">Merci de nous avoir fait confiance !</span></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"> </p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"><strong><span style="font-size: 16px;">Vous trouverez en pièce jointe le QRCODE nécéssaire à la récupération de votre commande.</span></strong></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t</td>\n' +
            '\t\t\t</tr>\n' +
            '\t\t</tbody>\n' +
            '\t</table>\n' +
            '</body>\n' +
            '</html>')
    } else {
        return ('<!DOCTYPE html PUBLIC>\n' +
            '\n' +
            '<html>\n' +
            '<head>\n' +
            '\t<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>\n' +
            '\t<meta content="width=device-width" name="viewport"/>\n' +
            '\t<title></title>\n' +
            '\t<style type="text/css">\n' +
            '\tbody {\n' +
            '\t\tmargin: 0;\n' +
            '\t\tpadding: 0;\n' +
            '\t}\n' +
            '\n' +
            '\ttable,\n' +
            '\ttd,\n' +
            '\ttr {\n' +
            '\t\tvertical-align: top;\n' +
            '\t\tborder-collapse: collapse;\n' +
            '\t}\n' +
            '\n' +
            '\t* {\n' +
            '\t\tline-height: inherit;\n' +
            '\t}\n' +
            '\n' +
            '\ta[x-apple-data-detectors=true] {\n' +
            '\t\tcolor: inherit !important;\n' +
            '\t\ttext-decoration: none !important;\n' +
            '\t}\n' +
            '</style>\n' +
            '<style id="media-query" type="text/css">\n' +
            '@media (max-width: 620px) {\n' +
            '\n' +
            '\t.block-grid,\n' +
            '\t.col {\n' +
            '\t\tmin-width: 320px !important;\n' +
            '\t\tmax-width: 100% !important;\n' +
            '\t\tdisplay: block !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.block-grid {\n' +
            '\t\twidth: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.col {\n' +
            '\t\twidth: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.col_cont {\n' +
            '\t\tmargin: 0 auto;\n' +
            '\t}\n' +
            '\n' +
            '\timg.fullwidth,\n' +
            '\timg.fullwidthOnMobile {\n' +
            '\t\tmax-width: 100% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col {\n' +
            '\t\tmin-width: 0 !important;\n' +
            '\t\tdisplay: table-cell !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack.two-up .col {\n' +
            '\t\twidth: 50% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num2 {\n' +
            '\t\twidth: 16.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num3 {\n' +
            '\t\twidth: 25% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num4 {\n' +
            '\t\twidth: 33% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num5 {\n' +
            '\t\twidth: 41.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num6 {\n' +
            '\t\twidth: 50% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num7 {\n' +
            '\t\twidth: 58.3% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num8 {\n' +
            '\t\twidth: 66.6% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num9 {\n' +
            '\t\twidth: 75% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.no-stack .col.num10 {\n' +
            '\t\twidth: 83.3% !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.video-block {\n' +
            '\t\tmax-width: none !important;\n' +
            '\t}\n' +
            '\n' +
            '\t.mobile_hide {\n' +
            '\t\tmin-height: 0px;\n' +
            '\t\tmax-height: 0px;\n' +
            '\t\tmax-width: 0px;\n' +
            '\t\tdisplay: none;\n' +
            '\t\toverflow: hidden;\n' +
            '\t\tfont-size: 0px;\n' +
            '\t}\n' +
            '\n' +
            '\t.desktop_hide {\n' +
            '\t\tdisplay: block !important;\n' +
            '\t\tmax-height: none !important;\n' +
            '\t}\n' +
            '}\n' +
            '</style>\n' +
            '<style id="icon-media-query" type="text/css">\n' +
            '@media (max-width: 620px) {\n' +
            '\t.icons-inner {\n' +
            '\t\ttext-align: center;\n' +
            '\t}\n' +
            '\n' +
            '\t.icons-inner td {\n' +
            '\t\tmargin: 0 auto;\n' +
            '\t}\n' +
            '}\n' +
            '</style>\n' +
            '</head>\n' +
            '<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff;">\n' +
            '\t<table bgcolor="#EAE3DD" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #EAE3DD; width: 100%;" valign="top" width="100%">\n' +
            '\t\t<tbody>\n' +
            '\t\t\t<tr style="vertical-align: top;" valign="top">\n' +
            '\t\t\t\t<td style="word-break: break-word; vertical-align: top;" valign="top">\n' +
            '\t\t\t\t\t<div style="background-color:#ffffff;">\n' +
            '\t\t\t\t\t\t<div class="block-grid" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">\n' +
            '\t\t\t\t\t\t\t<div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">\n' +
            '\t\t\t\t\t\t\t\t<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">\n' +
            '\t\t\t\t\t\t\t\t\t<div class="col_cont" style="width:100% !important;">\n' +
            '\t\t\t\t\t\t\t\t\t\t<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div align="center" class="img-container center fixedwidth" style="padding-right: 15px;padding-left: 15px;">\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size:1px;line-height:15px"> </div><img align="center" alt="Image" border="0" class="center fixedwidth" src="https://88-122-235-110.traefik.me:61001/assets/img/favicon.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 120px; display: block;" title="Image" width="120"/>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div style="font-size:1px;line-height:15px"> </div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div style="color:#2c8935;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; text-align: center; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #2c8935; mso-line-height-alt: 14px;"><span style="font-size: 24px;"><span style="font-size: 24px;">Salut '+client_name+' ! Merci pour votre commande</span></span></div>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.8;padding-top:0px;padding-right:20px;padding-bottom:0px;padding-left:20px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<div class="txtTinyMce-wrapper" style="line-height: 1.8; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #555555; mso-line-height-alt: 22px;">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 16px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 29px; margin: 0;"><span style="font-size: 16px;">Votre commande à bien été prise en compte !</span></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"> </p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 16px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 29px; margin: 0;"><span style="font-size: 16px;">Nous vous tiendrons au courant des prochaines avancées !</span></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"> </p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t\t<p style="font-size: 14px; line-height: 1.8; word-break: break-word; font-family: lucida sans unicode, lucida grande, sans-serif; mso-line-height-alt: 25px; margin: 0;"><strong><span style="font-size: 16px;">Vous trouverez en pièce jointe le QRCODE nécéssaire à la récupération de votre commande.</span></strong></p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>\n' +
            '\t\t\t\t</td>\n' +
            '\t\t\t</tr>\n' +
            '\t\t</tbody>\n' +
            '\t</table>\n' +
            '</body>\n' +
            '</html>')
    }
}
