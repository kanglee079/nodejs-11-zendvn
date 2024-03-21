const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Students';

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number},
    email: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    numberOfReports: { type: Number},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    ordering: { type: Number, default: 0 },
    role: { type: String, enum: ['quan li', 'hoc sinh'], default: 'hoc sinh' },
    books: [{ type: Schema.Types.ObjectId, ref: 'Books' }]
} , {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(COLLECTION_NAME, studentSchema);