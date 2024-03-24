const { CREATED, OK } = require('../core/success.response');
const AuthService = require('../services/auth.service');

class AuthorController {
    
    static info = async (req, res, next) => {
        new OK({
            message: 'Author fetched successfully!',
            metadata: await AuthService.info(req.user),
        }).sendData(res);
    }

    static createUser = async (req, res, next) => {
        new CREATED({
            message: 'Author created successfully!',
            metadata: await AuthService.addUser(req.body),
        }).sendData(res);
    }

    static loginUser = async (req, res, next) => {
        new OK({
            message: 'Author fetched successfully!',
            metadata: await AuthService.loginUser(req.body),
        }).sendData(res);
    }

    // static getAuthorById = async (req, res, next) => {
    //     new OK({
    //         message: 'Author fetched successfully!',
    //         metadata: await AuthorService.getAuthorById(req.params.id),
    //     }).sendData(res);
    // }

    // static getAuthors = async (req, res, next) => {
    //     new OK({
    //         message: 'Authors fetched successfully!',
    //         metadata: await AuthorService.getAuthors(req.query),
    //     }).sendData(res);
    // }

    // static updateAuthor = async (req, res, next) => {
    //     new OK({
    //         message: 'Author updated successfully!',
    //         metadata: await AuthorService.updateAuthor(req.params.id, req.body ),
    //     }).sendData(res);
    // }

    // static deleteAuthor = async (req, res, next) => {
    //     new OK({
    //         message: 'Author deleted successfully!',
    //         metadata: await AuthorService.deleteAuthor(req.params.id),
    //     }).sendData(res);
    // }

    // static deleteMultiAuthor = async (req, res, next) => {
    //     new OK({
    //         message: 'Authors deleted successfully!',
    //         metadata: await AuthorService.deleteMultiAuthor(req.body),
    //     }).sendData(res);
    // }

}

module.exports = AuthorController;