const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Users';
const DocumentName = 'User';

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    address: { type: String },
    fullname: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    ordering: { type: Number, default: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(DocumentName, userSchema);