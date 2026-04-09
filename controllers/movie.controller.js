import movieEvents from '../events/bus.js';

const getMovies = (req, res) => {
  res.status(200).json({ message: 'Hello from movie route!' });
};

const createMovie = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  const movie = {
    id: Date.now().toString(),
    title,
    createdAt: new Date().toISOString(),
  };

  movieEvents.emitMovieCreated(movie);
  return res.status(201).json({ message: 'Movie saved', movie });
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const movie = { id, ...updates, updatedAt: new Date().toISOString() };
  movieEvents.emitMovieUpdated(movie);

  return res.status(200).json({ message: 'Movie updated', movie });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;

  movieEvents.emitMovieDeleted({ id });
  return res.status(200).json({ message: 'Movie deleted', id });
};

export {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
