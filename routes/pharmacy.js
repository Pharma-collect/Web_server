const express = require('express')
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy')

router.get('/getPharmacyById', pharmacyController.getPharmacyById);
router.get('/getPharmacyByName', pharmacyController.getPharmacyByName);
router.get('/getPharmacyByCity', pharmacyController.getPharmacyByCity);
router.get('/getPharmacyByPostCode', pharmacyController.getPharmacyByPostCode);
router.get('/getPharmacyByBoss', pharmacyController.getPharmacyByBoss);
router.get('/getPharmacyWithShop', pharmacyController.getPharmacyWithShop);
router.get('/getPharmacyWithoutShop', pharmacyController.getPharmacyWithoutShop);
router.post('/createPharmacy', pharmacyController.createPharmacy);
router.post('/updatePharmacy', pharmacyController.updatePharmacy);
router.post('/deletePharmacyById', pharmacyController.deletePharmacyById);
router.post('/deletePharmacyByBoss', pharmacyController.deletePharmacyByBoss);


module.exports = router;
