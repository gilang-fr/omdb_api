$('.search-btn').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=a53ba479&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(movie => {
                cards += showCards(movie);
            });

            $('.movie-container').html(cards);

            // Ketika tombol modal-detail-btn di klik
            $('.modal-detail-btn').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=a53ba479&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetails(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});


function showCards(movie) {
    return `<div class="col-sm-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="img-thumbnail card-iovieg-top" alt="" />
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetails(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item">
                                <strong>Director : </strong>${m.Director}
                            </li>
                            <li class="list-group-item">
                                <strong>Actors : </strong>${m.Actors}
                            </li>
                            <li class="list-group-item">
                                <strong>Writer : </strong>${m.Writer}
                            </li>
                            <li class="list-group-item">
                                <strong>Plot : </strong><br />${m.Plot}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}