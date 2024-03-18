const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Subjects';

const subjectSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {
    collection: COLLECTION_NAME,
});

module.exports = model(COLLECTION_NAME, subjectSchema);