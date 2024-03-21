const {Schema, model} = require('mongoose');
const COLLECTION_NAME = 'Authors';

const authorSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number},
    status: {type: String, enum: ['active', 'inactive'], default: 'active'},
    ordering: {type: Number, default: 0},
    role: {type: String, enum: ['admin', 'user'], default: 'user'},
    books: [{type: Schema.Types.ObjectId, ref: 'Books'}]
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(COLLECTION_NAME, authorSchema);