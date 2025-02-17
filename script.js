

function menuClick() {
  var menu = document.getElementById('mobileMenu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}
var icon =document.getElementById("iconn");
function themechange(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    icon.src="sunn.png";
  }
  else{
    icon.src="moonn.png";
  }

}

const API_KEY = 'c11a0d4a35560adb36054f4336403e98';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

var searchInput = document.getElementById("search-but");
var searchResults = document.createElement("div");
searchResults.id = "search-results";
document.body.appendChild(searchResults);

let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

// Upcoming movies section
var upcomingMoviesSection = document.createElement("div");
upcomingMoviesSection.id = "upcoming-movies";
document.body.appendChild(upcomingMoviesSection);
if(window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  // Upcoming movies section
  var upcomingMoviesSection = document.createElement("div");
  upcomingMoviesSection.id = "upcoming-movies";
  document.body.appendChild(upcomingMoviesSection);

  fetchUpcomingMovies();
}

async function fetchUpcomingMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    displayUpcomingMovies(data.results);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }
}

function displayUpcomingMovies(movies) {
  upcomingMoviesSection.innerHTML = `
    <h2 id="u" >Upcoming Movies</h2>
    <div id="upcoming-movies-container"></div>
  `;

  const container = document.getElementById("upcoming-movies-container");

  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item-up");
    movieElement.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
      <p><strong>${movie.title}</strong></p>
    `;
    container.appendChild(movieElement);
  });
}


searchInput.addEventListener("input", function() {
  let query = searchInput.value.trim();
  if (query.length > 0) {
    upcomingMoviesSection.style.display = "none";
    fetchMovies(query);
  } else {
    searchResults.innerHTML = "";
    upcomingMoviesSection.style.display = "block";
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
// searching movie display
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
      <p><strong>${movie.title}</strong> <br> Rating: ${movie.vote_average}</p>
      <center> <button onclick="addToFavorites(${movie.id}, '${movie.title}', '${movie.poster_path}', ${movie.vote_average})" style="border-radius:20px">❤️ Add to Fav</button></center>
    `;
    movieElement.addEventListener("click", () => showMovieDetails(movie));
    searchResults.appendChild(movieElement);
  });
}
// movie details after clicking
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

function addToFavorites(id, title, posterPath, rating) {
  if (!favoriteMovies.some(movie => movie.id === id)) {
    favoriteMovies.push({ id, title, posterPath, rating });
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    alert("Added to favorites!");
  } else {
    alert("Already in favorites!");
  }
}

function removeFav(encodedTitle) {
  let title = decodeURIComponent(encodedTitle);
  let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
  favoriteMovies = favoriteMovies.filter(movie => movie.title !== title);
  localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
  loadFavorites();
}
