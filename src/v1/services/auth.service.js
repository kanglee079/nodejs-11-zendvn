const UsersModel = require('../models/user.model');
const AuthError = require('../core/error.response').AuthError;
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require('node:crypto');
const KeyTokenModel = require('../models/keytoken.model');

class AuthService{

    static info = async ({id}) => {
        return await UsersModel.findById(id).select('-password').lean();
    };

    static addUser = async ({username, password}) => {
        const findUser = await UsersModel.findOne({username}).lean();
        if(findUser) throw new Error('Username is already exist');

        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(password, salt);

        const user = await UsersModel.create({username, password: hash});

        if(!user) throw new AuthError('User not created', 400);

        return {user, token};
    }

    static loginUser = async ({username, password}) => {
        const user = await UsersModel.findOne({username}).lean();
        if(!user) throw new AuthError('User not found', 404);

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new AuthError('Password is not correct', 400);

        const publicKey = crypto.randomBytes(32).toString('hex');
        const privateKey = crypto.randomBytes(32).toString('hex');

        const accessToken = jwt.sign({id: user._id}, publicKey, {expiresIn: '1h'});
        const refeshToken = jwt.sign({id: user._id}, privateKey, {expiresIn: '10h'});

        await KeyTokenModel.findOneAndUpdate(
            {user: user._id}, 
            {publicKey, privateKey, refeshToken}, 
            {upsert: true, new: true}
        );

        // const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return {
            user,
            accessToken,
            refeshToken
        };
    }


}

module.exports = AuthService;