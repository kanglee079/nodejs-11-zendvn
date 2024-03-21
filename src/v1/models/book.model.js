const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Books';

const bookSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active'
    },
    ordering: {
        type: Number, 
        default: 0
    },
    students: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Students'
        }
    ],
    authors: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Authors'
        }
    ]
}, {
    collection: COLLECTION_NAME,
});

module.exports = model(COLLECTION_NAME, bookSchema);