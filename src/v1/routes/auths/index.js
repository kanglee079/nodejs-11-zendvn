const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/auth.controller');
const asyncHandle = require('../../utils/asyncHandle');
const checkAuthentication = require('../../middlewares/index').checkAuthentication;

router.post('/register', asyncHandle(AuthController.createUser));
router.post('/login', asyncHandle(AuthController.loginUser));

router.use(checkAuthentication);

router.get('/info', asyncHandle(AuthController.info));

module.exports = router;