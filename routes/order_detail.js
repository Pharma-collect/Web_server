const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order_detail");


router.post('/getOrderDetailById', containerController.getOrderDetailById);
router.post('/getOrderDetailsByOrder', containerController.getOrderDetailsByOrder);
router.post('/deleteOrderDetailById', containerController.deleteOrderDetailById);


module.exports = router;
