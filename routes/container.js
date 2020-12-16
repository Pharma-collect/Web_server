const express = require('express');
const router = express.Router();
const containerController = require("../controllers/container");


router.get('/getContainerById', containerController.getContainerById);

router.get('/getContainerByPharmacy', containerController.getContainerByPharmacy);

router.get('/getEmptyContainerByPharmacy', containerController.getEmptyContainerByPharmacy);

router.get('/getAllContainers', containerController.getAllContainers);

router.post('/addXContainerToPharmacy', containerController.addXContainerToPharmacy);

router.post('/updateContainer', containerController.updateContainer);

router.post('/deleteContainerById', containerController.deleteContainerById);

router.post('/deleteAllContainersFromPharma', containerController.deleteAllContainersFromPharma);


module.exports = router;
