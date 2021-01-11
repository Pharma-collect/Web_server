const express = require('express')
const router = express.Router();
const userProController = require('../controllers/user_pro');

router.get('/getAllUserPro', userProController.getAllUserPro);

router.post('/getUserProByPharmacy', userProController.getUserProByPharmacy);

router.post('/getUserProById', userProController.getUserProById);

router.post('/deleteUserPro', userProController.deleteUserPro);

router.post('/registerPro', userProController.registerPro);

router.post('/registerProPostman', userProController.registerProPostman);

router.post('/loginPro', userProController.loginPro);

module.exports = router;
