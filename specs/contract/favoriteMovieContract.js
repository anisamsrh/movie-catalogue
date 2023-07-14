const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  it('Should return the movie that had been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getMovie(1))
      .toEqual({ id: 1 });
    expect(await favoriteMovie.getMovie(2))
      .toEqual({ id: 2 });
    expect(await favoriteMovie.getMovie(3))
      .toEqual(undefined);
  });

  it('Should refuse the movie from being added if it does not have the correct property', async () => {
    favoriteMovie.putMovie({ aProperty: 'property' });

    expect(await favoriteMovie.getAllMovies())
      .toEqual([]);
  });

  it('can return all movies that have been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('Should remove favorite movie', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(1);

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('Should handle request to remove movie even though the movie has not been added', async () => {
    favoriteMovie.putMovie({ id: 1 });
    favoriteMovie.putMovie({ id: 2 });
    favoriteMovie.putMovie({ id: 3 });

    await favoriteMovie.deleteMovie(4);

    expect(await favoriteMovie.getAllMovies())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('Should be able to search for movies', async () => {
    favoriteMovie.putMovie({ id: 1, title: 'film a' });
    favoriteMovie.putMovie({ id: 2, title: 'film b' });
    favoriteMovie.putMovie({ id: 3, title: 'film abcde' });
    favoriteMovie.putMovie({ id: 4, title: 'ini mah film a' });

    expect(await favoriteMovie.searchMovies('film a')).toEqual([
      { id: 1, title: 'film a' },
      { id: 3, title: 'film abcde' },
      { id: 4, title: 'ini mah film a' },
    ]);
  });
};

export { itActsAsFavoriteMovieModel };
