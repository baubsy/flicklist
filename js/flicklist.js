

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "a4ff5367f00b26af01da349f7f060248" // TODO 0 add your api key
}


/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


/**
 * Makes an AJAX request to the /search/movie endpoint of the API, using the
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(searchTerm, callback) {
  console.log("searching for movies with '" + searchTerm + "' in their title...");

  // TODO 9
  // implement this function as described in the comment above
  // you can use the body of discoverMovies as a jumping off point


}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title)
      .attr("class", "item-watchlist");
      // TODO 3
      // give itemView a class attribute of "item-watchlist"

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1)
      .click(function() {
        model.watchlistItems.push(movie);
        render();

      });

      // TODO 2
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf()
      /*
      button.prop("disabled", false);
      model.watchlistItems.forEach(function(watchMovie) {
        if(watchMovie.orginal_title == movie.orginal_title)
        {
        button.prop("disabled", true);
        }

      });
      */
      /*
      if(model.watchlistItems.indexOf(movie.original_title) != -1)
      {

      }
      */
      /*
      model.watchlistItems.forEach(function(movie){
        //(movie.original_title != -1)
      if(movie.original_title == movie)
        button.prop("disabled", true);
      });
      */
    // TODO 1
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button
    var pnode = document.createElement("P");
    var desc = document.createTextNode(movie.overview);
    pnode.appendChild(desc);
    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(pnode)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });

}
