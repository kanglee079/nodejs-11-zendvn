"use strict"

const express = require('express');
const router = express.Router();

router.use('/auth', require('./authentication'));
router.use('/user', require('./user'));
router.use('/item', require('./item'));


module.exports = router;