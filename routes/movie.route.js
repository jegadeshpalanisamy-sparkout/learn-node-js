import express from 'express';
import { getMovies, createMovie, deleteMovie, updateMovie } from '../controllers/movie.controller.js';

const routes = express.Router();

routes.get('/', getMovies);
routes.post('/', createMovie);
routes.put('/:id', updateMovie);
routes.delete('/:id', deleteMovie);

export default routes;
