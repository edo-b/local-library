var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Author', require: true},
    summary: {type: String, required:true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.ObjectId, ref: 'Genre'}]
});

BookSchema
.virtual('url')
.get(() => {
    return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);