const apiKey = '0e97928887ec91c394e75fc9c3ddeb43';

// router creation
const global = {
    currentPage: window.location.pathname,
};

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
            break;
        case '/shows.html':
            console.log('shows');
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
