const BookModel = require('../models/book.model');
const AuthorModel = require('../models/author.model');
const StudentModel = require('../models/student.model');

class BooksService {

    static addBook = async (data) => {
        const book = await BookModel.create(data);

        for (const key in data.authors) {
            await AuthorModel.findByIdAndUpdate(data.authors[key], { $push: { books: book._id } }, { new: true });
        }

        return {
            book: book,
        };
    };  
    
    static async getAllBook({
        page = 1,
        limit = 5,
        sort = ''
    }) {
        let sortOptions = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        }
    
        const filters = {};
    
        const books = await BookModel.find(filters)
            .populate('authors') 
            .populate('students') 
            .skip((page - 1) * limit)
            .limit(+limit)
            .sort(sortOptions)
            .select('-__v')
            .lean(); 
    
        const totalBooks = await BookModel.countDocuments(filters); 
    
        return {
            data: books,
            total: totalBooks,
            page: page,
            limit: limit,
            totalPages: Math.ceil(totalBooks / limit)
        };
    }

    static getBookById = async ({id}) => {
        return await BookModel.findById(id)
        .populate('authors')
        .select('-__v')
        .lean();
    }

    static updateBook = async (id, data) => {
        return await BookModel.findByIdAndUpdate(id, data,)
        .select('-__v')
        .lean()
        ;
    }

    static deleteBook = async (id) => {

        await AuthorModel.updateMany(
            { books: id },
            { $pull: { books: id } }
        );

        await StudentModel.updateMany(
            { books: id },
            { $pull: { books: id } }
        );

        return await BookModel.findByIdAndDelete(id);
    }

    static deleteMultiBook = async ({ids}) => {
        await AuthorModel.updateMany(
            { books: { $in: ids } },
            { $pullAll: { books: ids } }
        );

        await StudentModel.updateMany(
            { books: { $in: ids } },
            { $pullAll: { books: ids } }
        );

        return await BookModel.deleteMany({ _id: { $in: ids } });
    }

    

    static getAllStudentByBook = async ({id}) => {
        return await BookModel.findById(id)
        .populate('students')
        .select()
        .lean()
    }


}

module.exports = BooksService;