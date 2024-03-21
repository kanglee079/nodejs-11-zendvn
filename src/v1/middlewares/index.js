const mongoose = require('mongoose');

const handleErrorsValidationMongoose = (error,req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        const e = {};
        for (const key in error.errors) {
            e[key] = error.errors[key].message;
        }
        return res.status(400).json({
            status: 400,
            message: e,
        });
    }
    next(error);
};

module.exports = {
    handleErrorsValidationMongoose
}