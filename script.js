function menuClick() {
  var menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

function searchClick() {
  var menu = document.getElementById('search-box-mb');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

const API_KEY = 'c11a0d4a35560adb36054f4336403e98';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

var searchInput = document.getElementById("search-but");
var searchResults = document.createElement("div");
searchResults.id = "search-results";
document.body.appendChild(searchResults);

searchInput.addEventListener("input", function() {
  let query = searchInput.value.trim();
  if (query.length > 0) {
    fetchMovies(query);
  } else {
    searchResults.innerHTML = "";
  }
});

async function fetchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

function displayMovies(movies) {
  searchResults.innerHTML = "";
  if (movies.length === 0) {
    searchResults.innerHTML = "<p>No results found</p>";
    return;
  }
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");
    movieElement.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
      <p><strong>${movie.title}</strong> - Rating: ${movie.vote_average}</p>
    `;
    movieElement.addEventListener("click", () => showMovieDetails(movie));
    searchResults.appendChild(movieElement);
    console.log("Movie clicked:", movie.title);

  });
}

function showMovieDetails(movie) {
  let movieDetails = document.getElementById("movie-details");
  if (!movieDetails) {
      movieDetails = document.createElement("div");
      movieDetails.id = "movie-details";
      document.body.appendChild(movieDetails);
  }
  
  movieDetails.innerHTML = `
      <div class="movie-overlay">
          <button class="close-btn" onclick="closeMovieDetails()">✖</button>
          <div class="movie-container">
              <div class="movie-poster">
                  <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
              </div>
              <div class="movie-info">
                  <h2>${movie.title}</h2>
                  <p><strong>Rating:</strong> ${movie.vote_average}</p>
                  <p><strong>Release Date:</strong> ${movie.release_date}</p>
                  <p><strong>Overview:</strong> ${movie.overview}</p>
              </div>
          </div>
      </div>
  `;
  
  movieDetails.classList.remove("hidden");
  movieDetails.style.display = "flex"; 
}



function closeMovieDetails() {
  let movieDetails = document.getElementById("movie-details");
  if (movieDetails) {
    movieDetails.style.display = "none";
  }
}
