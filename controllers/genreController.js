const async = require('async');
const mongoose = require('mongoose');

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
    res.send('NOT IMPLEMENTED Genre get create');
};

exports.post_create = function(req, res){
    res.send('NOT IMPLEMENTED');
};

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