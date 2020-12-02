const express = require('express');
const router = express.Router();
const containerController = require("../controllers/container");


router.get('/getContainerById', containerController.getContainerById);

router.get('/getContainerByPharmacy', containerController.getContainerByPharmacy);

router.get('/getEmptyContainerByPharmacy', containerController.getEmptyContainerByPharmacy);

router.get('/getContainerStatusById', containerController.getContainerStatusById);

router.get('/getContainerNumberById', containerController.getContainerNumberById);

router.get('/getContainerPharmacyById', containerController.getContainerPharmacyById);

router.get('/getAllContainers', containerController.getAllContainers);

router.post('/addXContainerToPharmacy', containerController.addXContainerToPharmacy);

router.post('/updateContainerStatusById', containerController.updateContainerStatusById);

router.post('/deleteContainerById', containerController.deleteContainerById);

router.post('/deleteAllContainersFromPharma', containerController.deleteAllContainersFromPharma);


module.exports = router;
