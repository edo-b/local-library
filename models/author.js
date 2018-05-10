var mongoose = require('mongoose');
const moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    firstName: {type: String, required:true, max:100},
    lastName: {type: String, required:true, max:100},
    dateOfBirth: {type: Date},
    dateOfDeath: {type: Date},
});

AuthorSchema
.virtual('fullName')
.get(function() {
    return this.firstName + " " + this.lastName 
});

AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('dateOfBirthFormatted')
.get(function(){
    return moment(this.dateOfBirth).format("DD.MM.YYYY");
});

AuthorSchema.virtual('dateOfDeathFormatted')
.get(function(){
    return moment(this.dateOfDeath).format("DD.MM.YYYY");
});

module.exports = mongoose.model('Author', AuthorSchema);