const AuthService = require('../services/auth.service');
const { CREATED, OK } = require('../core/success.response');

class AuthController{

    static registerUser = async (req, res, next) => {
        new CREATED({
            message: "Create user success!",
            metadata: await AuthService.createUser(req.body),
        }).sendData(res);
    }

    static loginUser = async (req, res, next) => {
        new OK({
            message: "Login success!",
            metadata: await AuthService.login(req.body),
        }).sendData(res);
    }

    static info = async (req, res, next) => {
        new OK({
            message: "Get user info success!",
            metadata: await AuthService.info(req.user),
        }).sendData(res);
    }

    static updateUser = async (req, res, next) => {
        new OK({
            message: "Update user success!",
            metadata: await AuthService.updateUser(req.user, req.body),
        }).sendData(res);
    }

    static async requestPasswordReset(req, res) {
       new OK({
           message: "Request password reset success!",
           metadata: await AuthService.requestPasswordReset(req.body.email),
       }).sendData(res);
    }

    static async resetPassword(req, res) {
        new OK({
            message: "Reset password success!",
            metadata: await AuthService.resetPassword(req.params.token, req.body.newPassword)
        }).sendData(res);
    }

    static async deleteUser(req, res) {
        new OK({
            message: "Delete user success!",
            metadata: await AuthService.deleteUser(req.body)
        }).sendData(res);
    }

}

module.exports = AuthController;