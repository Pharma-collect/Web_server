const express = require('express');
const router = express.Router();
const containerController = require("../controllers/order_detail");


router.get('/getOrderById', containerController.getOrderById);

module.exports = router;
