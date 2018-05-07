var Author = require('../models/author');

exports.get_list = function(req, res){
    res.send('NOT IMPLEMENTED. Author get list');
};

exports.get_instance = function(req, res){
    res.send('NOT IMPLEMENTED. Author ID = ' + req.params.id);
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