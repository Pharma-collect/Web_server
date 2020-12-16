const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order");


router.get('/getOrderById', containerController.getOrderById);

router.get('/getOrderByPharmacy', containerController.getOrderByPharmacy);

router.get('/getOrderByClient', containerController.getOrderByClient);

router.get('/getOrderByStatus', containerController.getOrderByStatus);

router.get('/getOrderByPreparator', containerController.getOrderByPreparator);

router.get('/getAllOrders', containerController.getAllOrders);

router.post('/createOrder', containerController.createOrder);

router.post('/deleteOrderById', containerController.deleteOrderById);

router.post('/updateOrder', containerController.updateOrder);


module.exports = router;
