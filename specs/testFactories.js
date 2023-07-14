import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import LikeButtonPresenter from '../src/scripts/utils/like-button-presenter';

const likeButtonContainerElement = () => document.querySelector('#likeButtonContainer');

const createLikeButtonPresenterWithMovie = async (movie) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: likeButtonContainerElement(),
    favoriteMovies: FavoriteMovieIdb,
    movie,
  });
};

export { createLikeButtonPresenterWithMovie };
