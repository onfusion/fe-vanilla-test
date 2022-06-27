/**
 * function to return rating for each movie as a whole number
 * @param {Array} ratings - Ratings Array in each movie from movies.json
 */
const getRating = (ratings) => {
    let total = 0;
    if (Array.isArray(ratings)) {
        ratings.forEach((rate) => {
            if (rate.Value.indexOf('/') !== -1) {
                const [left, right] = rate.Value.split('/');
                total += left / right;
            } else if (rate.Value.indexOf('%') !== -1) {
                total += parseInt(rate.Value) / 100
            }
        });
        return Math.floor(total / ratings.length * 5);
    } else {
        return null;
    }
};

function star(rate) {
    var starHTML = '';
    var rate = parseInt(rate);
    var increment = 0;
    var max = 5; // maximum rating

    while(increment < rate) {
        starHTML += '<img src="../images/star-filled.svg" alt="Star"/>';
        increment++;
    }

    while(max > rate) {
        starHTML += '<img src="../images/star-empty.svg" alt="Star"/>';
        max--;
    }
    return starHTML;
};

$(document).ready(function () {

    // FETCHING DATA FROM JSON FILE
    $.getJSON("./movies.json", function (data) {
        var moveiCard = '';

        // ITERATING THROUGH OBJECTS
        $.each(data, function (key, value) {

            //CONSTRUCTION OF ROWS HAVING
            // DATA FROM JSON OBJECT
            moveiCard += '<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div class="card movie-card mb-5">';
            moveiCard += '  <div class="card-img">';
            moveiCard += '      <img class="img-fluid" src="'+ value.Poster +'" alt="Banner" />';
            moveiCard += '  </div>';
            moveiCard += '  <div class="card-rating">';
            moveiCard += '      <small class="d-block text-center">(' + getRating(value.Ratings) + ')</small>';
            moveiCard += '      <div class="rating">'+ star(getRating(value.Ratings)) +'</div>';
            moveiCard += '  </div>';
            moveiCard += '</div></div>';
        });

        //INSERTING ROWS INTO TABLE
        $('#movieCard').append(moveiCard);
    });
});