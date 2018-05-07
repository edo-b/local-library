var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    firstName: {type: String, required:true, max:100},
    lastName: {type: String, required:true, max:100},
    dateOfBirth: {type: Date},
    dateOfDeath: {type: Date},
});

AuthorSchema
.virtual('fullName')
.get(() => {
    return this.firstName + " " + this.lastName 
});

AuthorSchema
.virtual('url')
.get(() => {
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);