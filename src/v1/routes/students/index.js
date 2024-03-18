"use strict"

const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/student.controller');
const asyncHandler = require('../../utils/asyncHandle');

router.post('/', asyncHandler(StudentController.createStudent));
router.get('/', asyncHandler(StudentController.getStudents));
router.get('/fill', asyncHandler(StudentController.getStudentByAge));
router.get('/fill-report', asyncHandler(StudentController.getStudentByReport));
router.get('/fill-age-email', asyncHandler(StudentController.getStudentByAgeAndEmail));
router.put('/:id', asyncHandler(StudentController.updateReport));

module.exports = router;