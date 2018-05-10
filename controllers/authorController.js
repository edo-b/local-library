const mongoose = require('mongoose');
const async = require('async');

var Author = require('../models/author');
var Book = require('../models/book');

exports.get_list = function(req, res, next){
    Author.find()
          .sort('lastName')
          .exec(function(err, data){
        if(err) { return next(err); }
        res.render('authorList', {title: "Author list", authorList: data});
    });
};

exports.get_instance = function(req, res, next){
    const id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        author: function(callback){
            Author.findById(id, callback);
        },
        books: function(callback){
            Book.find({'author': id}).exec(callback);
        }
    }, function(err, data){
        if(err) return next(err);
        if(!data.author){
            var error = new Error("Author not found!");
            error.code = 404;
            return next(error);
        }
        res.render('author', {title: "Author details", author: data.author, books:data.books});
    })
};

exports.get_create = function(req, res){
    res.send('NOT IMPLEMENTED. Author get create');
};

exports.post_create = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_delete = function(req, res){
    res.send('NOT IMPLEMENTED.  Author get delete ID = ' + req.params.id);
};

exports.post_delete = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_update = function(req, res){
    res.send('NOT IMPLEMENTED. Author get update ID = ' + req.params.id);
};

exports.post_update = function(req, res){
    res.send('NOT IMPLEMENTED');
};