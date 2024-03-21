"use strict"

const express = require('express');
const router = express.Router();

router.use('/students', require('./students'));
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;