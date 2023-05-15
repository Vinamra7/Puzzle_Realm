const express = require('express');
const router = express.Router();

const userController = require('../component/login.js')
const puzzleController = require('../component/puzzle.js')
const adminController = require('../component/admin.js')

router.post('/check', userController.check)
router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.post('/code', userController.code);
router.post('/checkMail', userController.checkMail);
router.post('/resetPass', userController.resetPass);
router.post('/updatePassword', userController.updatePassword);
router.post('/start', puzzleController.start);
router.post('/end', puzzleController.end);
router.post('/pull', puzzleController.pull);
router.post('/results', adminController.results);

module.exports = router;