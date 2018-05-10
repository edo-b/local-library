var async = require('async');
const mongoose = require('mongoose');

var Book = require('../models/book');
var Author = require('../models/author');
var BookInstance = require('../models/bookInstance');
var Genre = require('../models/genre');

exports.index = function(req ,res, next){
    async.parallel({
        bookCount: function(callback){
            Book.count({}, callback);
        },
        bookInstanceCount: function(callback){
            BookInstance.count({}, callback);
        },
        availableBookInstanceCount: function(callback){
            BookInstance.count({status: "Available"}, callback);
        },
        authorCount: function(callback){
            Author.count({}, callback);
        },
        genreCount: function(callback){
            Genre.count({}, callback);
        }},
        function(err, data){
            res.render('index', {title: "Home", error: err, data: data });
        }
    );
}

exports.get_list = function(req, res, next){
    Book.find({}, 'title author')
        .populate('author')
        .exec(function(err, data){
            if(err) {return next(err);}
            res.render('bookList', {title: 'Book list', bookList: data});
        });
};

exports.get_instance = function(req, res, next){
    const id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        book: function(callback){
            Book.findById(id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        bookInstances: function(callback){
            BookInstance.find({'book': id}).exec(callback);
        }
    }, function(err, data){
        if(err) { return next(err); }
            if(!data.book){
                var error = new Error("Book not found!");
                error.status = 404;
                return next(error);
            }
            res.render('book', {title:"Book details", book: data.book, bookInstanceList: data.bookInstances});
    });
};

exports.get_create = function(req, res){
    res.send('NOT IMPLEMENTED Book get create');
};

exports.post_create = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_delete = function(req, res){
    res.send('NOT IMPLEMENTED. Book get delete ID = ' + req.params.id);
};

exports.post_delete = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_update = function(req, res){
    res.send('NOT IMPLEMENTED. Book get update ID = ' + req.params.id);
};

exports.post_update = function(req, res){
    res.send('NOT IMPLEMENTED');
};