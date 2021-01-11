const express = require('express')
const router = express.Router();
const userProController = require('../controllers/user_pro');

router.get('/getAllUserPro', userProController.getAllUserPro);

router.get('/getUserProByPharmacy', userProController.getUserProByPharmacy);

router.get('/getUserProByUsername', userProController.getUserProByUsername);

router.post('/deleteUserProByUsername', userProController.deleteUserProByUsername);

router.post('/createUserPro', userProController.createUserPro);

router.post('/createUserProPostman', userProController.createUserProPostman);

router.post('/loginPro', userProController.loginPro);

module.exports = router;
