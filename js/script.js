// router creation
const global = {
    currentPage: window.location.pathname,
};

// display 20 most popular movies
async function displayPopularMovies() {
    // object destructuring
    const { results } = await fetchAPIData('movie/popular');
    console.log(results);
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                    : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
            }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });
}

// display 20 popular tv shows
async function displayPopularShows() {
    // object destructuring
    const { results } = await fetchAPIData('tv/popular');
    console.log(results);
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${show.id}">
            ${
                show.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                    />`
                    : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                    />`
            }
        </a>
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${
                    show.first_air_date
                }</small>
            </p>
        </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });
}

// fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '0e97928887ec91c394e75fc9c3ddeb43';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();
    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    hideSpinner();

    console.log(data);
    return data;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// init App runs on every page
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('home');
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('shows');
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('movie details');
            break;
        case '/tv-details.html':
            console.log('tv details');
            break;
        case '/search.html':
            console.log('search');
            break;

        default:
            break;
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
