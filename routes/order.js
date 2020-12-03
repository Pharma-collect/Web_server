const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order");


router.get('/getOrderById', containerController.getOrderById);

router.get('/getOrderByPharmacy', containerController.getOrderByPharmacy);

router.get('/getOrderByClient', containerController.getOrderByClient);

router.get('/getOrderStatusById', containerController.getOrderStatusById);

router.get('/getOrderDetailById', containerController.getOrderDetailById);

router.get('/getOrderByStatus', containerController.getOrderByStatus);

router.get('/getAllOrders', containerController.getAllOrders);


module.exports = router;
