var Author = require('../models/bookInstance');

exports.get_list = function(req, res){
    res.send('NOT IMPLEMENTED. BookInstance get list');
};

exports.get_instance = function(req, res){
    res.send('NOT IMPLEMENTED. BookInstance get instance ID = ' + req.params.id);
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