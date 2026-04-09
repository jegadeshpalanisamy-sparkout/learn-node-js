import bus from '../events/bus.js';

function registerMovieListeners() {
  const onCreated = (movie) => {
    console.log('Movie created:', movie.id, movie.title);
  };

  const onUpdated = (movie) => {
    console.log('Movie updated:', movie.id);
  };

  const onDeleted = ({ id }) => {
    console.log('Movie deleted:', id);
  };

  bus.onMovieCreated(onCreated);
  bus.onMovieUpdated(onUpdated);
  bus.onMovieDeleted(onDeleted);

  return () => {
    bus.off('movie.created', onCreated);
    bus.off('movie.updated', onUpdated);
    bus.off('movie.deleted', onDeleted);
  };
}

export { registerMovieListeners };
