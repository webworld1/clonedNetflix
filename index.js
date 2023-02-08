// let url = "https://api.themoviedb.org/3/movie/550?api_key=f0fb5d20e1eb115cb9dad8436efbc850"
// all const
const apikey = "f0fb5d20e1eb115cb9dad8436efbc850"
const apikey2 = "7543524441a260664a97044b8e2dc621"
const endpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original"
const apipaths = {
    fetchTrending: `${endpoint}/trending/movie/week?api_key=${apikey}`,
    fetchAllcategories: `${endpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${endpoint}/list/${id}?api_key=${apikey}`
}


// boots up in the app
function init() {
    fetchTrendingMovies();
    fetchAndBuidAllSections();
};


function fetchTrendingMovies() {
    fetch(apipaths.fetchTrending)
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            const trendingMovies = res.results;
            console.log(trendingMovies);
            if (Array.isArray(trendingMovies) && trendingMovies.length) {
                buildTrendingSection(trendingMovies.slice(0, 5), "Trending Movies");
                const randomPoster = parseInt(Math.random()* trendingMovies.length)
                buildbannerSection(imgPath + trendingMovies[randomPoster].backdrop_path, trendingMovies[randomPoster].title, trendingMovies[randomPoster].overview.slice(0,300), trendingMovies[randomPoster].release_date
                    );
                // console.log(imgPath, "Trending");
            }
        })
};

function buildbannerSection(poster ,movieTitle , overview, release_date) {
    const bannerCont = document.getElementById("banner-section")
    console.log(bannerCont)
     bannerCont.style.backgroundImage = `url(${poster})`;

   const bannerHtml = `
   <div class="banner-content">
     <h2 class="banner-title">${movieTitle}</h2>
     <p class="banner-info">Released on ${release_date
     } </p>
     <p class="banner-overview">${overview}...</p>
   </div>
   <div class="btn-action-cont">
     <button class="action-btn">Play</button>
     <button class="action-btn">More Info</button>
   </div>` 
//    console.log(bannerHtml)
   bannerCont.innerHTML = bannerHtml;
   


    //append div into movies section container
// bannerCont.append(bannerHtml);


}


function buildTrendingSection(list, categoryname) {
    console.log(list)
    const trendcont = document.getElementById('movies-trend');
    const moviesListHtml = list.map(item => {
        return ` <img class="movies-item" src="${imgPath}${item.backdrop_path}" alt="">
                `
    }).join('')
    // console.log(moviesListHtml)
    const moviesSectionHtml = `
        <span class="movies-section-heading">${categoryname}<span class="explore-nudge">Explore All</span> </span>
        <div class="movies-row">
        ${moviesListHtml}</div>
        `
    const div = document.createElement("div")
    div.className = "movies-section"
    div.innerHTML = moviesSectionHtml
    //append div into movies section container

    trendcont.append(div);
};


function fetchAndBuidAllSections() {

    fetch(apipaths.fetchAllcategories)
        .then(res => res.json()
        )
        .then(res => {
            // console.log(res);
            const categories = res.genres
            if (Array.isArray(categories) && categories.length) {
                categories.slice(0, 7).forEach(category => {
                    fetchAndBuildMovieSection(apipaths.fetchMoviesList(category.id), category)
                    // console.log(category);
                })
            }
            // console.log(categories)
        })
        .catch((err) => {
            console.log(err);
        })

    function fetchAndBuildMovieSection(fetchUrl, categories) {
        fetch(fetchUrl)
            .then(res => res.json())
            .then(res => {
                // console.log(res.items);
                const movies = res.items;
                // console.log(movies);
                if (Array.isArray(movies) && movies.length) {
                    buildMoviesSection(movies.slice(0, 5), categories.name)

                }
            })
            .catch((err) => { console.log(err); })
    }

    function buildMoviesSection(list, categoryname) {
        // console.log(list, categoryname);
        const moviesCont = document.getElementById("movies-cont")
        const moviesListHtml = list.map(item => {
            return ` <img class="movies-item" src="${imgPath}${item.backdrop_path}" alt="">
                `
        }).join('')
        // console.log(moviesListHtml);

        const moviesSectionHtml = `
        <span class="movies-section-heading">${categoryname}<span class="explore-nudge">Explore All</span> </span>
        <div class="movies-row">
        ${moviesListHtml}</div>
        `
        // console.log(moviesSectionHtml);
        const div = document.createElement("div")
        div.className = "movies-section"
        div.innerHTML = moviesSectionHtml
        //append div into movies section container

        moviesCont.append(div);
    }

}



window.addEventListener("load", function () {
    init()
})

