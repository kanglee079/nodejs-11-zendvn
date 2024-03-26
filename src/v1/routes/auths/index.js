const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/auth.controller');
const asyncHandle = require('../../utils/asyncHandle');
const {checkAuthentication, checkIsAdmin} = require('../../middlewares/index');

router.post('/register', asyncHandle(AuthController.registerUser));
router.post('/login', asyncHandle(AuthController.loginUser));

router.post('/request-reset-password', AuthController.requestPasswordReset);
router.post('/reset-password/:token', AuthController.resetPassword);

router.use(asyncHandle(checkAuthentication));

router.get('/info', asyncHandle(AuthController.info));
router.put('/update', asyncHandle(AuthController.updateUser));
router.delete('/delete', checkIsAdmin, asyncHandle(AuthController.deleteUser));

module.exports = router;