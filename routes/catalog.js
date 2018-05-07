var express = require('express');
var router = express.Router();

var authorController = require('../controllers/authorController');
var bookController = require('../controllers/bookController');
var bookInstanceController = require('../controllers/bookInstanceController');
var genreController = require('../controllers/genreController');

// Book routes

router.get('/', bookController.index);

router.get('/books', bookController.get_list);

router.get('/book/create', bookController.get_create);
router.post('/book/create', bookController.post_create);

router.get('/book/:id', bookController.get_instance);

router.get('/book/:id/delete', bookController.get_delete);
router.post('/book/:id/delete', bookController.post_delete);

router.get('/book/:id/update', bookController.get_update);
router.post('/book/:id/update', bookController.post_update);

// Author routes

router.get('/authors', authorController.get_list);

router.get('/author/create', authorController.get_create);
router.post('/author/create', authorController.post_create);

router.get('/author/:id', authorController.get_instance);

router.get('/author/:id/delete', authorController.get_delete);
router.post('/author/:id/delete', authorController.post_delete);

router.get('/author/:id/update', authorController.get_update);
router.post('/author/:id/update', authorController.post_update);

// Genre routes

router.get('/genres', genreController.get_list);

router.get('/genre/create', genreController.get_create);
router.post('/genre/create', genreController.post_create);

router.get('/genre/:id', genreController.get_instance);

router.get('/genre/:id/delete', genreController.get_delete);
router.post('/genre/:id/delete', genreController.post_delete);

router.get('/genre/:id/update', genreController.get_update);
router.post('/genre/:id/update', genreController.post_update);

// Bookinstance routes

router.get('/bookInstances', bookInstanceController.get_list);

router.get('/bookInstance/create', bookInstanceController.get_create);
router.post('/bookInstance/create', bookInstanceController.post_create);

router.get('/bookInstance/:id', bookInstanceController.get_instance);

router.get('/bookInstance/:id/delete', bookInstanceController.get_delete);
router.post('/bookInstance/:id/delete', bookInstanceController.post_delete);

router.get('/bookInstance/:id/update', bookInstanceController.get_update);
router.post('/bookInstance/:id/update', bookInstanceController.post_update);

module.exports = router;