var Author = require('../models/genre');

exports.get_list = function(req, res){
    res.send('NOT IMPLEMENTED. Genre get list');
};

exports.get_instance = function(req, res){
    res.send('NOT IMPLEMENTED. Genre get instance ID = ' + req.params.id);
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