

const express = require('express');
const { getMovies, createMovie, deleteMovie, updateMovie } = require('../controllers/movie.controller.js');
const routes = express.Router();
routes.get('/',getMovies );

routes.post('/', createMovie);

routes.put('/:id', updateMovie)

routes.delete('/:id', deleteMovie)

module.exports = routes