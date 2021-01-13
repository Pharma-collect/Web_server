const express = require('express')
const router = express.Router();
const userProController = require('../controllers/user_pro');

router.get('/getAllUserPro', userProController.getAllUserPro);

router.post('/getUserProByPharmacy', userProController.getUserProByPharmacy);

router.post('/getUserProById', userProController.getUserProById);

router.post('/deleteUserProById', userProController.deleteUserProById);

router.post('/createUserPro', userProController.createUserPro);

router.post('/createUserProPostman', userProController.createUserProPostman);

router.post('/loginPro', userProController.loginPro);

module.exports = router;
