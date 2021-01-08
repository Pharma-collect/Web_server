const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const userClientController = require('../controllers/user_client');

router.get('/getAllUserClient', userClientController.getAllUserClient);

router.post('/getUserClientById', auth,userClientController.getUserClientById);

router.post('/getUserClientByUsername', userClientController.getUserClientByUsername);

router.post('/deleteUserClient', userClientController.deleteUserClient);

router.post('/registerClient', userClientController.registerClient);

router.post('/registerClientPostman', userClientController.registerClientPostman);

router.post('/loginClient', userClientController.loginClient);

module.exports = router;

