const { Types } = require('mongoose');
const StudentModel = require('../models/student.model');
const BookModel = require('../models/book.model');

class StudentsService {

    static addStudent = async (data) => {
        const student = await StudentModel.create(data);

        for (const key in data.books) {
            await BookModel.findByIdAndUpdate(data.books[key], { $push: { students: student._id } }, { new: true });
        }
        return {
            student: student,
        };
    };

    static getStudentById = async (id) => {
        return await StudentModel.findById(id)
            .populate('books')
            .select('-__v');
    }

    // lấy sinh viên có điều kiện
    static getStudents = async ({
        page = 1,
        limit = 10,
        book,
        age,
        ageMin,
        ageMax,
        email,
        sort
    }) => {
        // Xây dựng điều kiện lọc cơ bản
        let filters = {};
        if (book) {
            filters.books = book;
        }
        if (age) {
            filters.age = { $gt: age };
        }
        if (ageMin && ageMax) {
            filters.age = { $gte: ageMin, $lte: ageMax };
        }
        if (email) {
            filters.email = { $regex: email };
        }

        // Xử lý sắp xếp
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }

        const data = await StudentModel.find(filters)
            .populate('books')
            .skip((page - 1) * limit)
            .limit(+limit)
            .sort(sortOptions)
            ;

        // Tính toán tổng số trang
        const total = await StudentModel.countDocuments(filters);

        return {
            page,
            limit: +limit,
            totalPages: Math.ceil(total / limit),
            data
        };
    };

    // tăng giảm số lượng báo cáo
    static updateStudent = async ({ id, body }) => {
        console.log(body);

        return await StudentModel.findByIdAndUpdate(id, { $set: body }, { new: true });
    };

    static deleteStudent = async (id) => {
        const student = await StudentModel.findById(id);
        if (!student) {
            throw new Error('Student not found');
        }

        await StudentModel.findByIdAndDelete(id);
    
        return await BookModel.updateMany(
            { students: id },
            { $pull: { students: id } }
        );
    }

    static deleteMultiStudent = async (ids) => {
        await StudentModel.deleteMany({ _id: { $in: ids } });
    
        return await BookModel.updateMany(
            { students: { $in: ids } },
            { $pullAll: { students: ids } }
        );
    }

}
module.exports = StudentsService;