const express = require('express')
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy')

router.post('/getPharmacyById', pharmacyController.getPharmacyById);
router.post('/getPharmacyByName', pharmacyController.getPharmacyByName);
router.post('/getPharmacyByCity', pharmacyController.getPharmacyByCity);
router.post('/getPharmacyByPostCode', pharmacyController.getPharmacyByPostCode);
router.post('/getPharmacyByBoss', pharmacyController.getPharmacyByBoss);
router.post('/getPharmacyWithShop', pharmacyController.getPharmacyWithShop);
router.post('/getPharmacyWithoutShop', pharmacyController.getPharmacyWithoutShop);
router.post('/createPharmacy', pharmacyController.createPharmacy);
router.post('/updatePharmacy', pharmacyController.updatePharmacy);
router.post('/deletePharmacyById', pharmacyController.deletePharmacyById);
router.post('/deletePharmacyByBoss', pharmacyController.deletePharmacyByBoss);


module.exports = router;
