const UserModel = require('../models/user.model');
const AuthError = require('../core/error.response').AuthError;
const bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require('node:crypto');
const KeyTokenModel = require('../models/keytoken.model');
const nodemailer = require('nodemailer');

class AuthServices {
    
    static createUser = async (data) => {
        const findUser = await UserModel.findOne({ username: data.username });
        if(findUser) throw new AuthError("User already exists!");

        const salt = bycrypt.genSaltSync(10);
        const hashPassword = bycrypt.hashSync(data.password, salt);

        const user = await UserModel.create({
            username: data.username, 
            password: hashPassword, 
            email: data.email, 
            phone: data.phone, 
            address: data.address, 
            fullname: data.fullname, 
            role: data.role
        });

        if(!user) throw new AuthError("Create user failed!");

        return {user};
    };

    static login = async ({username, password}) => {
        const user = await UserModel.findOne({ username: username }).lean();
        if(!user) throw new AuthError("User not found!");

        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) throw new AuthError("Password incorrect!", 400);

        const publicKey = crypto.randomBytes(32).toString('hex');
        const privateKey = crypto.randomBytes(32).toString('hex');

        const accessToken = jwt.sign({id: user._id, role: user.role}, publicKey, {expiresIn: '1h'});
        const refeshToken = jwt.sign({id: user._id, role: user.role}, privateKey, {expiresIn: '7d'});

        await KeyTokenModel.findOneAndUpdate(
            {user: user._id}, 
            {publicKey, privateKey}, 
            {new: true, upsert: true}
        );

        return {
            user,
            accessToken,
            refeshToken
        }
    }

    static info = async ({id}) => {
        return await UserModel.findById(id).select('-password').lean();
    }

    static updateUser = async (user, data) => {
        const userToUpdate = await UserModel.findById(user.id);
        if (!userToUpdate) throw new AuthError("User not found!", 404);
    
        if (data.password) {
            const salt = bycrypt.genSaltSync(10);
            const hashPassword = bycrypt.hashSync(data.password, salt);
            userToUpdate.password = hashPassword;
        }
    
        const fieldsToUpdate = ['email', 'phone', 'address', 'fullname'];
        fieldsToUpdate.forEach(field => {
            if (data[field] && userToUpdate[field] !== data[field]) {
                userToUpdate[field] = data[field];
            }
        });
    
        await userToUpdate.save();
    
        const updatedUserData = userToUpdate.toObject();
        delete updatedUserData.password;
    
        return updatedUserData;
    };
    
    static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    static async requestPasswordReset(email) {
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("User does not exist with that email.");

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; 

        await user.save();

        const resetURL = `https://428a-2401-d800-2ad0-ed9d-a9cf-68bc-c3d0-e7c9.ngrok-free.app/auths/reset-password/${token}`;
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `Please click link to reset password: ${resetURL}`
        };

        await this.transporter.sendMail(mailOptions);

        return resetURL;    
    }

    static async resetPassword(token, newPassword) {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) throw new Error("Password reset token is invalid or has expired.");

        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(newPassword, salt);
        
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
    }

    static async deleteUser({id}) {
       return await UserModel.findByIdAndDelete(id);
    }

}

module.exports = AuthServices;