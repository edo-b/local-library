var async = require('async');
const mongoose = require('mongoose');
const { body, validationResult} = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter');

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
    async.parallel({
        authorList: function(callback){
            Author.find(callback);
        },
        genreList: function(callback){
            Genre.find(callback);
        }
    }, function(err, data){
        if(err) return next(err);
        res.render('createBook', {title:"Create a new book", authorList: data.authorList, genreList: data.genreList});
    });
};

exports.post_create = [
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    body('title', 'Title is required!').trim().isLength({ min: 1 }),
    body('author', 'Author is required!').trim().isLength({ min: 1 }),
    body('summary', 'Summary is required!').trim().isLength({ min: 1 }),
    body('isbn', 'ISBN is required!').trim().isLength({ min: 1 }),

    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        var book = new Book({ 
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            summary: req.body.summary, 
            isbn: req.body.isbn
         });

         const errors = validationResult(req);

         if(!errors.isEmpty()){
            async.parallel({
                authorList: function(callback){
                    Author.find(callback);
                },
                genreList: function(callback){
                    Genre.find(callback);
                }
            }, function(err, data){
                if(err) return next(err);
                res.render('createBook', {title:"Create a new book", errors: errors.array(), authorList: data.authorList, genreList: data.genreList, book: book});
                return;
            });
         }

        else {
                book.save(function(err){
                    if(err) { return next(err); }
                    res.redirect(book.url);
                });
        }
    }
];

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