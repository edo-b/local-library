const mongoose = require('mongoose');

var BookInstance = require('../models/bookInstance');

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

exports.get_create = function(req, res){
    res.send('NOT IMPLEMENTED BookInstance get create');
};

exports.post_create = function(req, res){
    res.send('NOT IMPLEMENTED');
};

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