const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order");


router.get('/getOrderById', containerController.getOrderById);

router.get('/getOrderByPharmacy', containerController.getOrderByPharmacy);

router.get('/getOrderByClient', containerController.getOrderByClient);

router.get('/getOrderStatusById', containerController.getOrderStatusById);

router.get('/getOrderDetailById', containerController.getOrderDetailById);

router.get('/getOrderByStatus', containerController.getOrderByStatus);

router.get('/getOrderByPreparator', containerController.getOrderByPreparator);

router.get('/getAllOrders', containerController.getAllOrders);

router.get('/getOrderPreparatorById', containerController.getOrderPreparatorById);

router.get('/getOrderContainerById', containerController.getOrderContainerById);

router.get('/getOrderQrCodeById', containerController.getOrderQrCodeById);

router.get('/getOrderPharmacyById', containerController.getOrderPharmacyById);

router.get('/getOrderTotalPriceById', containerController.getOrderTotalPriceById);

router.post('/createOrder', containerController.createOrder);

router.post('/deleteOrderById', containerController.deleteOrderById);

router.post('/updateOrderStatusById', containerController.updateOrderStatusById);

router.post('/updateOrderPreparatorById', containerController.updateOrderPreparatorById);

router.post('/updateOrderContainerById', containerController.updateOrderContainerById);

router.post('/updateOrderQrCodeById', containerController.updateOrderQrCodeById);



module.exports = router;
