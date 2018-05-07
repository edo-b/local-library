var Author = require('../models/book');

exports.index = function(req ,res){
    res.send('NOT IMPLEMENTED. SITE HOMEPAGE');
}

exports.get_list = function(req, res){
    res.send('NOT IMPLEMENTED. Book get list');
};

exports.get_instance = function(req, res){
    res.send('NOT IMPLEMENTED. Book get instance ID = ' + req.params.id);
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