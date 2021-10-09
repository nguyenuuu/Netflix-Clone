// api base
const api = 'api_key=d1398630b33f51a1859427ce8c8153ea';
const base_url = 'https://api.themoviedb.org/3';
const image_url = 'https://image.tmdb.org/t/p/original';
const requests = {
    fetchPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api}`,
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=27`,
}
// banner
async function banner() {
    const response = await fetch(requests.fetchTrending);
    const data = response.json();
    return data;
}
banner().then(data => {
    const imageBanner = document.querySelector('.banner img');
    imageBanner.src = image_url + data.results[0].poster_path;
});

// add data to html
function dataToHTML(data, title) {
    const category = data.results.map(value => {
        return `
        <div class="movie" data-backdrop="${image_url}${value.backdrop_path}" data-overview="${value.overview}" data-year="${value.release_date}">
            <img src="${image_url}${value.poster_path}">
            <div class="name-vote">
                <h4 class="name-movie">${value.title}</h4>
                <p class="vote">Vote: <span>${value.vote_average}</span></p>
            </div>
        </div>
        `
    });
    let html = `<div class="list-movie">` + category.join('') + `</div>`;
    html += `
        <button class="prev"><i class="fas fa-chevron-left"></i></button>
        <button class="next"><i class="fas fa-chevron-right"></i></button>
    `;
    html = `<h3 class="title">${title}</h3>` + html;
    html = `<div class="category">` + html + `</div>`;
    return html;
}

// api popular movie
const main = document.querySelector('.main');
async function popularMovie() {
    const response = await fetch(requests.fetchPopular);
    const data = await response.json();
    return data;
}
popularMovie().then(data => {
    main.innerHTML = dataToHTML(data, 'Popular on Netflix');
});

// trending
async function trending() {
    const response = await fetch(requests.fetchTrending);
    const data = await response.json();
    return data;
}
trending().then(data => {
    main.innerHTML += dataToHTML(data, 'Trending');
});

// netflix originals
async function original() {
    const response = await fetch(requests.fetchNetflixOrignals);
    const data = await response.json();
    return data;
}
original().then(data => {
    main.innerHTML += dataToHTML(data, 'Netflix Originals');
});

// action movie
async function action() {
    const response = await fetch(requests.fetchActionMovies);
    const data = await response.json();
    return data;
}
action().then(data => {
    main.innerHTML += dataToHTML(data, 'Action Movies');
});

// Comedy Movies
async function comedy() {
    const response = await fetch(requests.fetchComedyMovies);
    const data = await response.json();
    return data;
}
comedy().then(data => {
    main.innerHTML += dataToHTML(data, 'Comedy Movies');
});

// Horror Movies
async function horror() {
    const response = await fetch(requests.fetchHorrorMovies);
    const data = await response.json();
    return data;
}
horror().then(data => {
    main.innerHTML += dataToHTML(data, 'Horror Movies');
});

// RomanceMovies
async function romance() {
    const response = await fetch(requests.fetchRomanceMovies);
    const data = await response.json();
    return data;
}
romance().then(data => {
    main.innerHTML += dataToHTML(data, 'Romance Movies');
});

// Documentaries
async function documentaries() {
    const response = await fetch(requests.fetchComedyMovies);
    const data = await response.json();
    return data;
}
documentaries().then(data => {
    main.innerHTML += dataToHTML(data, 'Documentaries');
    // carousel
    const categories = document.querySelectorAll('.category');
    categories.forEach((cate) => {
        cate.querySelector('.next').addEventListener('click', () => {
            const movies = cate.querySelectorAll('.movie');
            if (movies[movies.length - 1].getBoundingClientRect().right <= window.innerWidth - 15) return;
            movies.forEach(movie => {
                movie.style.transform += `translateX(${- 2 * movies[0].offsetWidth - 12}px)`;
            });
        });
        cate.querySelector('.prev').addEventListener('click', () => {
            const movies = cate.querySelectorAll('.movie');
            if (movies[0].getBoundingClientRect().left > 0) return;
            movies.forEach(movie => {
                movie.style.transform += `translateX(${2 * movies[0].offsetWidth + 12}px)`;
            });
        });
    });
    // preview
    const movies = document.querySelectorAll('.movie');
    const preview = document.querySelector('.preview');
    const previewText = document.querySelector('.preview-text');
    movies.forEach(movie => {
        movie.addEventListener('click', () => {
            preview.querySelector('img').src = movie.getAttribute("data-backdrop");
            previewText.querySelector('.name-movie').textContent = movie.querySelector('.name-movie').textContent;
            previewText.querySelector('.vote-average span').textContent = movie.querySelector('.vote span').textContent;
            previewText.querySelector('.year span').textContent = movie.getAttribute('data-year');
            previewText.querySelector('.summary').textContent = movie.getAttribute('data-overview');
            preview.style.opacity = 1;
            preview.style.transform = `translate(0, 0) scale(1)`;
        });
    });
    // close preview
    const close = document.querySelector('.close');
    close.addEventListener('click', () => {
        preview.style.opacity = 0;
        preview.style.transform = `translate(-300px, 300px) scale(0)`;
    })
});