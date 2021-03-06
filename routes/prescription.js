const express = require('express');
const router = express.Router();
const prescriptionController = require("../controllers/prescription");

router.post('/createPrescription', prescriptionController.createPrescription);
router.post('/updatePrescription', prescriptionController.updatePrescription);
router.post('/deletePrescription', prescriptionController.deletePrescription);
router.post('/getPrescriptionById', prescriptionController.getPrescriptionById);
router.post('/getPrescriptionsByPharmacy', prescriptionController.getPrescriptionsByPharmacy);
router.post('/getPrescriptionsByClient', prescriptionController.getPrescriptionsByClient);
router.post('/getPrescriptionsByStatus', prescriptionController.getPrescriptionsByStatus);

module.exports = router;
