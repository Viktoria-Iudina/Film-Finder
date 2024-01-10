const tmdbKey = 'f4c49a2483b5408d5619cdb6a90e5867';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

const playBtn = document.getElementById('playBtn');

// asyncronous function that sends a promise
const getGenres = async () => {
  
  // making an API request
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=f4c49a2483b5408d5619cdb6a90e5867`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {

    // sending a fetch request 
    const response = await fetch(urlToFetch);

    // handling API response and then catching errors 
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const genres = jsonResponse.genres;
      // console.log(genres);

      // returning a list of genres with a dropdown menu
      return genres;
    }

  } catch(error) {
    console.log(error);
  }

};

// returning movies according to genres
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const movies = jsonResponse.results;
      // console.log(movies);
      return movies;
    }
  } catch(error) {
    console.log(error);
  }
};
// getMovies();


const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      console.log(movieInfo);
      return movieInfo;
    }
  } catch(error) {
    console.log(error);
  }
};


const getMovieDate = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/release_date`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const date = await jsonResponse.release_date;
      console.log(date);
      return date;
    }
  } catch(error) {
    console.log(error);
  }
};


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);

};




getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;