const AuthorModel = require('../models/author.model');
const BookModel = require('../models/book.model');

class AuthorsService {
    
    // thêm tác giả
    static addAuthor = async (data) => {
        return await AuthorModel.create(data);
    };

    // lấy tác giả có điều kiện
    static getAuthors = async ({
        page = 1,
        limit = 5,
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

        const data = await AuthorModel.find(filters)
            .populate('books')
            .skip((page - 1) * limit)
            .limit(+limit)
            .sort(sortOptions)
            ;

        // Tính toán tổng số trang
        const total = await AuthorModel.countDocuments(filters);

        return {
            page,
            limit: +limit,
            totalPages: Math.ceil(total / limit),
            data
        };
    };

    // lấy tác giả theo id
    static getAuthorById = async (id) => {
        return await AuthorModel.findById(id)
            .populate('books')
            .select('-__v')
            .lean()
    }

    // cập nhật tác giả
    static updateAuthor = async (id, data) => {
        return await AuthorModel.findByIdAndUpdate(id, data, { new: true });
    }

    // xóa tác giả
    static deleteAuthor = async (id) => {
        const author = await AuthorModel.findById(id).select('books');

        if (author.books.length > 0) {
            await BookModel.deleteMany({ _id: { $in: author.books } });
        }
    
        return await AuthorModel.findByIdAndDelete(id);
    }

    // xoá nhiều tác giả
    static deleteMultiAuthor = async ({ids}) => {
        const authors = await AuthorModel.find({ _id: { $in: ids } }).select('books');

        for (let author of authors) {
            if (author.books.length > 0) {
                await BookModel.deleteMany({ _id: { $in: author.books } });
            }
        }

        return await AuthorModel.deleteMany({ _id: { $in: ids } });
    }

}

module.exports = AuthorsService;