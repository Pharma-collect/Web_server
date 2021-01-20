const express = require('express');
const router = express.Router();
const dataController = require("../controllers/data");


router.post('/getFamousProducts', dataController.getFamousProducts);
router.post('/getSalesRevenue', dataController.getSalesRevenue);


module.exports = router;
