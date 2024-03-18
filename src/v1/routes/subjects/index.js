const express = require('express');
const router = express.Router();
const SubjectsController = require('../../controller/subject.controller');

router.post('/', SubjectsController.createSubject);

module.exports = router;