const express = require('express');
const router = express.Router();
const containerController = require("../controllers/container");


router.post('/getContainerById', containerController.getContainerById);

router.post('/getContainerByPharmacy', containerController.getContainerByPharmacy);

router.post('/getEmptyContainerByPharmacy', containerController.getEmptyContainerByPharmacy);

router.post('/getAllContainers', containerController.getAllContainers);

router.post('/addXContainerToPharmacy', containerController.addXContainerToPharmacy);

router.post('/updateContainer', containerController.updateContainer);

router.post('/deleteContainerById', containerController.deleteContainerById);

router.post('/deleteAllContainersFromPharma', containerController.deleteAllContainersFromPharma);


module.exports = router;
