const express = require('express');
const router = express.Router();

const userController = require('../component/login.js')

router.post('/check', userController.check)
router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.post('/code', userController.code);
router.post('/checkMail', userController.checkMail);
router.post('/resetPass', userController.resetPass);
router.post('/updatePassword', userController.updatePassword);

module.exports = router;