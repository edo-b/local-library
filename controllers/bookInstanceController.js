const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var BookInstance = require('../models/bookInstance');
var Book = require('../models/book');

exports.get_list = function(req, res, next){
    BookInstance.find()
                .populate('book')
                .exec(function(err, data) {
                    if(err) { return next(err); }
                    res.render('bookInstanceList', {title: "Book instances", bookInstanceList: data});
                });
};

exports.get_instance = function(req, res, next){
    const id = mongoose.Types.ObjectId(req.params.id);
    BookInstance.findById(id)
                .populate('book')
                .exec(function(err, bookInstance){
                    if(err) return next(err);
                    if(!bookInstance){
                        var error = new Error("Book instance not found");
                        error.code = 404;
                        return next(error);
                    }
                    res.render('bookInstance', {title: "Book instance details", bookInstance: bookInstance});
                });
};

exports.get_create = function(req, res, next){
    Book.find(function(err, bookList){
        if(err) return next(err);
        res.render('createBookInstance', {title:"Create a new book instance (copy)", bookList: bookList});        
    })
};

exports.post_create = [
    body('book', 'Book is required').trim().isLength({ min:1 }),
    body('imprint', 'Imprint is required').trim().isLength({ min: 1 }),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('book').trim().escape(),
    sanitizeBody('imprint').trim().escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        var bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if(!errors.isEmpty()){
            Book.find(function(err, bookList){
                if(err) return next(err);
                res.render('createBookInstance', { title: "Create a new book instance (copy)", errors: errors.array(), bookInstance: bookInstance, bookList: bookList });
            })
        }

        else {
            bookInstance.save(function(err){
                if(err) return next(err);
                res.redirect(bookInstance.url);
            })
        }
    }
];

exports.get_delete = function(req, res){
    res.send('NOT IMPLEMENTED. BookInstance get delete ID = ' + req.params.id);
};

exports.post_delete = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_update = function(req, res){
    res.send('NOT IMPLEMENTED.  BookInstance get update ID = ' + req.params.id);
};

exports.post_update = function(req, res){
    res.send('NOT IMPLEMENTED');
};