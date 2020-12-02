const express = require('express')
const router = express.Router();
const userClientController = require('../controllers/user_client');

router.get('/getAllUserClient', userClientController.getAllUserClient);

router.get('/getUserClientById', userClientController.getUserClientById);

router.get('/getUserClientByUsername', userClientController.getUserClientByUsername);

router.post('/createUserClient', userClientController.createUserClient);

router.post('/deleteUserClientById', userClientController.deleteUserClientById);

module.exports = router;

