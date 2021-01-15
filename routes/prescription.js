const express = require('express');
const router = express.Router();
const prescriptionController = require("../controllers/prescription");

router.post('/createPrescription', prescriptionController.createPrescription);
router.post('/updatePrescription', prescriptionController.updatePrescription);
router.post('/deletePrescription', prescriptionController.deletePrescription);

module.exports = router;
