const assert = require('assert');

Feature('Liking Movies');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking a movie', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.movie__title a', 3);
  I.seeElement('.movie__title a');
  const firstMovieTitle = await I.grabTextFrom('.movie__title');
  I.click(locate('.movie__title a').first());

  I.waitForElement('#likeButton', 3);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.movie-item');

  I.seeElement('.movie__title');
  const likedMovieTitle = await I.grabTextFrom('.movie__title');
  console.log(likedMovieTitle);

  assert.strictEqual(firstMovieTitle, likedMovieTitle);
});

Scenario('searching movie', async ({ I }) => {
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.movie__title a', 3);
  I.seeElement('.movie__title a');

  const titles = [];

  for (let i = 1; i < 4; i++) {
    I.click(locate('.movie__title a').at(i));
    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.movie__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchedTitles = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  console.log(searchQuery);
  console.log(matchedTitles);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleMovies = await I.grabNumberOfVisibleElements('.movie-item');
  assert.strictEqual(matchedTitles.length, visibleMovies);

  matchedTitles.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.movie__title').at(index + 1));
    console.log(visibleTitle);
    assert(visibleTitle, title);
  });
});
