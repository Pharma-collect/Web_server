const express = require('express');
const router = express.Router();
const fileController = require("../controllers/file");

var multer = require('multer');
const bodyParser = require('body-parser');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + "-" + file.originalname);
    }
});

var fileUpload = multer({ storage: storage })


router.post('/', fileUpload.single('file'), fileController.upload);


module.exports = router;