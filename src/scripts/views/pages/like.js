/* eslint-disable no-new */
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import FavoriteMovieSearchView from './liked-movies/favorite-movie-search-view';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter';
import FavoriteMovieShowPresenter from './liked-movies/favorite-movie-show-presenter';

const view = new FavoriteMovieSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
  },
};

export default Like;
