const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Users';
const DocumentName = 'User';

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    // ordering: { type: Number, default: 0 },
    // role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(DocumentName, userSchema);