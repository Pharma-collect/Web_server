const express = require('express')
const router = express.Router();
const userClientController = require('../controllers/user_client');

router.get('/getAllUserClient', userClientController.getAllUserClient);

router.post('/getUserClientById', userClientController.getUserClientById);

router.post('/getUserClientByUsername', userClientController.getUserClientByUsername);

router.post('/deleteUserClientById', userClientController.deleteUserClientById);

router.post('/registerClient', userClientController.registerClient);

router.post('/registerClientPostman', userClientController.registerClientPostman);

router.post('/loginClient', userClientController.loginClient);

module.exports = router;

