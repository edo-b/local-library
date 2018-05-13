const async = require('async');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Genre = require('../models/genre');
var Book = require('../models/book');

exports.get_list = function(req, res, next){
    Genre.find()
         .sort('name')
         .exec(function(err, data){
            if(err) return next(err);
            res.render('genreList', {title:"Genre list", genreList: data});
        });
};

exports.get_instance = function(req, res, next){
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id).exec(callback);
        },
        genreBookList: function(callback){
            const id = mongoose.Types.ObjectId(req.params.id);
            Book.find({'genre': req.params.id}).exec(callback);
        }
    }, function(err, data) {
        if(err) return next(err);
        if(!data.genre){
            var error = new Error("Genre not found");
            error.status = 404;
            return next(error)
        }
        res.render('genre', {title:"Genre details", genre: data.genre, genreBookList: data.genreBookList});
    });
};

exports.get_create = function(req, res){
    res.render('createGenre', {title: "Crete a new genre"});
};

exports.post_create = [
    body('name', 'Genre name is required!').trim().isLength({ min:1 }),
    sanitizeBody('name').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var genre = new Genre ({name: req.body.name});

        if(!errors.isEmpty()){
            res.render('createGenre', {title:"Create new genre", genre: genre, errors: errors.array()});
            return;
        }

        Genre.findOne({'name': req.body.name}, function(err, foundGenre){
            if(err) return next(err);

            else if(foundGenre){
                res.redirect(foundGenre.url);
            }

            else{
                genre.save(function(err){
                    if(err) return next(err);

                    res.redirect(genre.url);
                });
            }
        });
    }
];

exports.get_delete = function(req, res){
    res.send('NOT IMPLEMENTED.  Genre get delete ID = ' + req.params.id);
};

exports.post_delete = function(req, res){
    res.send('NOT IMPLEMENTED');
};

exports.get_update = function(req, res){
    res.send('NOT IMPLEMENTED. Genre get update ID = ' + req.params.id);
};

exports.post_update = function(req, res){
    res.send('NOT IMPLEMENTED');
};