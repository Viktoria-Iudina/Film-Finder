const tmdbKey = 'f4c49a2483b5408d5619cdb6a90e5867';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';



// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};
