// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres')

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};






// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById('likeOrDislikeBtns');
  btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  moviePosterDiv.innerHTML = '';
  movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};



// Display liked movies in the HTML
function displayLikedMovies() {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
  const likedMoviesList = document.getElementById('liked-movies');
  
  likedMoviesList.innerHTML = ''; // Clear previous list content
  
  likedMovies.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.textContent = movie;
    likedMoviesList.appendChild(listItem);
  });
}

// Function to add a movie to the liked movies list
function addLikedMovie(movie) {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
  likedMovies.push(movie);
  localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  displayLikedMovies(); // Update liked movies display
}

// Add event listeners to like and dislike buttons
function setupButtons() {
  const likeButton = document.getElementById('likeBtn');
  const dislikeButton = document.getElementById('dislikeBtn');

  likeButton.addEventListener('click', function() {
    const movieText = document.getElementById('movieText').textContent;
    addLikedMovie(movieText);
  });
}

// Call setupButtons function and displayLikedMovies on window load
window.onload = function() {
  setupButtons();
  displayLikedMovies();
};






// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('id', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('id', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie release date
const createReleaseDate = (date) => {
  const releaseDate = document.createElement('h3');
  releaseDate.setAttribute('id', 'releaseDate');
  releaseDate.innerHTML = date;

  return releaseDate;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const releaseDate = createReleaseDate(movieInfo.release_date);



  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(releaseDate);
  movieTextDiv.appendChild(overviewText);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};