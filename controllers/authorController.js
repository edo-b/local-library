const mongoose = require('mongoose');
const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    res.render('createAuthor', { title: "Create a new author" })
};

exports.post_create = [
    body('firstName').trim().isLength({ min:1 }).withMessage('First name is required')
                     .isAlphanumeric().withMessage('First name has some non-alphanumeric characters'),
    body('lastName').trim().isLength({ min:1 }).withMessage('Last name is required')
                     .isAlphanumeric().withMessage('Last name has some non-alphanumeric characters'),
    body('dateOfBirth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('dateOfDeath', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('firstName').trim().escape(),
    sanitizeBody('lastName').trim().escape(),
    sanitizeBody('dateOfBirth').toDate(),
    sanitizeBody('dateOfDeath').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath
        });

        if(!errors.isEmpty()){
            res.render('createAuthor', { title: "Create new author", author: author, errors: errors.array() });
            return;
        }

        else{
            author.save(function(err){
                if(err) return next(err);
                res.redirect(author.url);
            });
        }
    }
];

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