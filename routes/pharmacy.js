const express = require('express')
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy')

router.get('/getPharmacyById', pharmacyController.getPharmacyById);
router.post('/createPharmacy', pharmacyController.createPharmacy);

module.exports = router;
