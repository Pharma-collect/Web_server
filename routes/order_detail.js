const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order_detail");


router.get('/getOrderDetailById', containerController.getOrderDetailById);
router.post('/createOrderDetail', containerController.createOrderDetail);
router.post('/deleteOrderDetailById', containerController.deleteOrderDetailById);


module.exports = router;
