"use strict"

const express = require('express');
const router = express.Router();

router.use('/students', require('./students'));
router.use('/subjects', require('./subjects'));

module.exports = router;