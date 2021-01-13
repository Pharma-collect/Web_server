const express = require('express');
const router = express.Router();
const prescriptionController = require("../controllers/prescription");

router.post('/createPrescription', prescriptionController.createPrescription);

module.exports = router;
