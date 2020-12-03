const express = require('express')
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy')

router.get('/getPharmacyById', pharmacyController.getPharmacyById);

module.exports = router;
