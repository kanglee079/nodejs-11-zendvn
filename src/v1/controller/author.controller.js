const { CREATED, OK } = require('../core/success.response');
const AuthorService = require('../services/authors.service');

class AuthorController {
    static createAuthor = async (req, res, next) => {
        new CREATED({
            message: 'Author created successfully!',
            metadata: await AuthorService.addAuthor(req.body),
        }).sendData(res);
    }

    static getAuthorById = async (req, res, next) => {
        new OK({
            message: 'Author fetched successfully!',
            metadata: await AuthorService.getAuthorById(req.params.id),
        }).sendData(res);
    }

    static getAuthors = async (req, res, next) => {
        new OK({
            message: 'Authors fetched successfully!',
            metadata: await AuthorService.getAuthors(req.query),
        }).sendData(res);
    }

    static updateAuthor = async (req, res, next) => {
        new OK({
            message: 'Author updated successfully!',
            metadata: await AuthorService.updateAuthor(req.params.id, req.body ),
        }).sendData(res);
    }

    static deleteAuthor = async (req, res, next) => {
        new OK({
            message: 'Author deleted successfully!',
            metadata: await AuthorService.deleteAuthor(req.params.id),
        }).sendData(res);
    }

    static deleteMultiAuthor = async (req, res, next) => {
        new OK({
            message: 'Authors deleted successfully!',
            metadata: await AuthorService.deleteMultiAuthor(req.body),
        }).sendData(res);
    }

}

module.exports = AuthorController;