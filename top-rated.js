document.addEventListener("DOMContentLoaded", fetchTopRatedMovies);

async function fetchTopRatedMovies() {
    const apiKey = "c11a0d4a35560adb36054f4336403e98";  
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        
        let filteredMovies = data.results.filter(movie => movie.title !== "The Godfather Part II");

        
        const fightClubResponse = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}&language=en-US`);
        const fightClub = await fightClubResponse.json();

    
        filteredMovies.push(fightClub);
        filteredMovies.sort((a, b) => b.vote_average - a.vote_average); // Sort in descending order

        // Limit to top 10 movies
        displayMovies(filteredMovies.slice(0, 10));
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "flex bg-gray-800 p-4 rounded-lg shadow-lg relative";

        movieCard.innerHTML = `
            <!-- Movie Poster -->
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" 
                class="w-32 h-48 object-cover rounded-lg">

            <!-- Movie Details -->
            <div class="ml-4 flex flex-col justify-between">
                <h2 class="text-xl font-bold">${movie.title}</h2>
                <p class="text-gray-400">⭐ <strong>${movie.vote_average.toFixed(1)}</strong> / 10</p>
                <p class="text-gray-300">${movie.overview.slice(0, 150)}...</p>
                <p class="text-gray-500">📅 Release Date: ${movie.release_date}</p>
            </div>

            <!-- Heart Button -->
           
        `;

        container.appendChild(movieCard);
    });
}

