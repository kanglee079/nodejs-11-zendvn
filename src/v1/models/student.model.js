const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Students';

const studentSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    numberOfReports: { type: Number, required: true },
    role: { type: String, enum: ['quan li', 'hoc sinh'], default: 'hoc sinh' },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subjects' }]
} , {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(COLLECTION_NAME, studentSchema);