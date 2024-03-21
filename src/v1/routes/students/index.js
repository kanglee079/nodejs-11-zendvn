"use strict"

const express = require('express');
const router = express.Router();
const StudentController = require('../../controller/student.controller');
const asyncHandler = require('../../utils/asyncHandle');

router.post('/', asyncHandler(StudentController.createStudent));
router.get('/:id', asyncHandler(StudentController.getStudentById));
router.get('/', asyncHandler(StudentController.getStudents));
router.put('/:id', asyncHandler(StudentController.updateStudent));
router.delete('/:id', asyncHandler(StudentController.deleteStudent));
router.patch('/delete-multi', asyncHandler(StudentController.deleteMultiStudent));

module.exports = router;