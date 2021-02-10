
const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order");


router.post('/getOrderById', containerController.getOrderById);

router.post('/getOrderByHash', containerController.getOrderByHash);

router.post('/getOrderByPharmacy', containerController.getOrderByPharmacy);

router.post('/getOrderByClient', containerController.getOrderByClient);

router.post('/getOrderByStatus', containerController.getOrderByStatus);

router.post('/getOrderByPreparator', containerController.getOrderByPreparator);

router.get('/getAllOrders', containerController.getAllOrders);

router.post('/createOrder', containerController.createOrder);

router.post('/deleteOrderById', containerController.deleteOrderById);

router.post('/updateOrder', containerController.updateOrder);


module.exports = router;
