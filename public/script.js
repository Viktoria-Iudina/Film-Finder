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
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);

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
      console.log(jsonResponse);
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch(error) {
    console.log(error);
  }
};
// getMovies();


const getMovieInfo = () => {

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;