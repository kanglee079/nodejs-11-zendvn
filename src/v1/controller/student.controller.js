const { CREATED, OK } = require('../core/success.response');

const StudentService = require('../services/students.service');

class StudentController {
    static createStudent = async (req, res, next) => {
       new CREATED({
            message: 'Student created successfully!',
            metadata: await StudentService.addStudent(req.body),
       }).sendData(res);
    }

    static getStudents = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudents(req.query),
        }).sendData(res);
    }

    static getStudentByAge = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudentByAge(req.query),
        }).sendData(res);
    }

    static getStudentByReport = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudentByReport(req.query),
        }).sendData(res);
    }

    static getStudentByAgeAndEmail = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudentByAgeAndEmail(),
        }).sendData(res);
    }

    static updateReport = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.updateReport(req.params, req.query),
        }).sendData(res);
    }
}

module.exports = StudentController;