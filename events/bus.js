import { EventEmitter } from 'node:events';

const EVENTS = {
  MOVIE_CREATED: 'movie.created',
  MOVIE_UPDATED: 'movie.updated',
  MOVIE_DELETED: 'movie.deleted',
};

class AppBus extends EventEmitter {
  emitMovieCreated(payload) {
    this.emit(EVENTS.MOVIE_CREATED, payload);
  }

  emitMovieUpdated(payload) {
    this.emit(EVENTS.MOVIE_UPDATED, payload);
  }

  emitMovieDeleted(payload) {
    this.emit(EVENTS.MOVIE_DELETED, payload);
  }

  onMovieCreated(handler) {
    this.on(EVENTS.MOVIE_CREATED, handler);
  }

  onMovieUpdated(handler) {
    this.on(EVENTS.MOVIE_UPDATED, handler);
  }

  onMovieDeleted(handler) {
    this.on(EVENTS.MOVIE_DELETED, handler);
  }
}

export default new AppBus();
