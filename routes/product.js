const express = require('express')
const router = express.Router();
const productController = require('../controllers/product');

router.get('/getAllProducts', productController.getAllProducts);

router.post('/getProductsByPharmacy', productController.getProductsByPharmacy);

router.post('/createProduct', productController.createProduct);

module.exports = router;
