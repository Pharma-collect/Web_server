const express = require('express')
const router = express.Router();
const productController = require('../controllers/product');

router.get('/getAllProducts', productController.getAllProducts);

router.post('/getProductsByPharmacy', productController.getProductsByPharmacy);

router.post('/createProduct', productController.createProduct);
router.post('/updateProduct', productController.updateProduct);

router.post('/deleteProduct', productController.deleteProductById);


module.exports = router;
