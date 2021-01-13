const db = require('../models');
const utils = require('./utils');

exports.createPrescription = async function(req, res, next) {
    const {
        filetype,
        id_client,
        id_pharmacy,
        detail,
    } = req.body;

    if (!filetype || !id_client || !id_pharmacy){
        res.json({
            success: false,
            error: "Informations manquantes"
        })
    } else {
        await utils.uploadMedia(req.files, filetype)
            .then(function(uploadResult){
                if(uploadResult.success){
                    return uploadResult.url;
                }else{
                    res.status(uploadResult.errorCode).json({
                        success: false,
                        error: uploadResult.error
                    })
                }
            })
            .then(async (url) => {
                try {
                    let pres = await db.prescription.create({id_client : id_client,  id_pharmacy : id_pharmacy, detail: detail, image_url: url})

                    res.status(200).json({
                        success: true,
                        result: pres,
                    })
                } catch (e) {
                    res.status(500).json({
                        success: false,
                        error: "erreur creation db",
                        info: e
                    })
                }
            })
            .catch(error => res.json({
                success: false,
                error: error
            }));
    }
}
