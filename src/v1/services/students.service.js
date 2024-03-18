const StudentModel = require('../models/student.model');


class StudentsService {

    static addStudent = async (data) => {
        return await StudentModel.create(data);
    };

    // lấy sinh viên có điều kiện
    static getStudents = async ({page, limit}) => {
        return await StudentModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('subjects');
    };

    // lấy sinh viên theo tuổi
    static getStudentByAge = async ({age}) => {
        return await StudentModel.find({age : {$gt: age}});
    }

    // lấy và sắp xếp sinh viên theo số lượng báo cáo
    static getStudentByReport = async ({sort}) => {
        sort = parseInt(sort);
        return await StudentModel.find().sort({numberOfReports: sort});
    }
   
    // tìm các sinh viên có tuổi từ 10 -> 20 và có mail là @gmail.com
    static getStudentByAgeAndEmail = async () => {
        return await StudentModel.find({
            age: {$gte: 10, $lte: 20}, 
            email: {$regex: /@gmail.com/}
        });
    }

    // tăng giảm số lượng báo cáo
    static updateReport = async ({id}, {action}) => {
        const update = action === 'increase' ? { $inc: { numberOfReports: 1 } } : { $inc: { numberOfReports: -1 } };
        return await StudentModel.findByIdAndUpdate(id, update, { new: true });
    };
}
module.exports = StudentsService;