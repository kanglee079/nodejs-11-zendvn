"use strict"

const express = require('express');
const router = express.Router();

router.use('/auths', require('./auths'));


module.exports = router;