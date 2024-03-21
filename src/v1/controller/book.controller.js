const { CREATED, OK } = require('../core/success.response');

const BookService = require('../services/books.service');

class BookController {
    static createBook = async (req, res, next) => {
       new CREATED({
            message: 'created successfully!',
            metadata: await BookService.addBook(req.body),
       }).sendData(res);
    }

    static getAllBook = async (req, res, next) => {
        new OK({
             message: 'get all successfully!',
             metadata: await BookService.getAllBook(req.query),
        }).sendData(res);
     }

     static getBookById = async (req, res, next) => {
        new OK({
             message: 'get successfully!',
             metadata: await BookService.getBookById(req.params),
        }).sendData(res);
     }

     static updateBook = async (req, res, next) => {
        new OK({
             message: 'updated successfully!',
             metadata: await BookService.updateBook(req.params.id, req.body),
        }).sendData(res);
     }

     static deleteBook = async (req, res, next) => {
          new OK({
               message: 'deleted successfully!',
               metadata: await BookService.deleteBook(req.params.id),
          }).sendData(res);
     }

     static deleteMultiBook = async (req, res, next) => {
          new OK({
               message: 'deleted successfully!',
               metadata: await BookService.deleteMultiBook(req.body),
          }).sendData(res);
     }

}

module.exports = BookController;