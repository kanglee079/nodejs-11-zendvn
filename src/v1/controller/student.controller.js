const { CREATED, OK } = require('../core/success.response');

const StudentService = require('../services/students.service');

class StudentController {
    static createStudent = async (req, res, next) => {
       new CREATED({
            message: 'Student created successfully!',
            metadata: await StudentService.addStudent(req.body),
       }).sendData(res);
    }
    
    static getStudentById = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudentById(req.params.id),
        }).sendData(res);
    }

    static getStudents = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.getStudents(req.query),
        }).sendData(res);
    }
    
    static updateStudent = async (req, res, next) => {
        new OK({
            message: 'Students fetched successfully!',
            metadata: await StudentService.updateStudent({id: req.params.id, body: req.body}),
        }).sendData(res);
    }

    static deleteStudent = async (req, res, next) => {
        new OK({
            message: 'Students deleted successfully!',
            metadata: await StudentService.deleteStudent(req.params.id),
        }).sendData(res);
    }

    static deleteMultiStudent = async (req, res, next) => {
        new OK({
            message: 'Students deleted successfully!',
            metadata: await StudentService.deleteMultiStudent(req.body),
        }).sendData(res);
    }

}

module.exports = StudentController;