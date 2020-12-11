const express = require('express')
const router = express.Router();
const productController = require('../controllers/product');

router.get('/getAllProducts', productController.getAllProducts);

router.get('/getProductsByPharmacy', productController.getProductsByPharmacy);

module.exports = router;
