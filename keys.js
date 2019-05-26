
// "fs" package to read and write
var fs = require("fs");

// "axios" package for movie info
var axios = require("axios");


console.log("Hello");


// COMMAND DISCERNMENT
// First Arg: Action (i.e. "movies", "concerts", "songs")
// Second Arg: Term being searched

var action = process.argv[2];
var value = process.argv[3];

// Switch-case statement (if-else would also work).
switch (action) {

  case "movies":
    searchMovies();
    break;

  // case "concerts":
  //   searchConcerts();
  //   break;

  // case "songs":
  //   searchSongs();
  //   break;

  // case "tweets":
  //   searchTweets();
  //   break;
}



//OMBD AXIOS (Complete)

// If the "searchMovies" function is called...
function searchMovies() {


  //TITLE DISCERNMENT

  // Store all of the arguments in an array
  var movieArgs = process.argv;
  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all words from movie args
  // For-Loop Magic for handlings inclusion of "+"s
  for (var i = 3; i < movieArgs.length; i++) {
    if (i > 3 && i < movieArgs.length) {
      movieName = movieName + "+" + movieArgs[i];
    }
    else {
      movieName += movieArgs[i];
    }
  }

  // Run Request with Axios to OMDB API
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // Debugging Help
  console.log("Extracted from: " + queryUrl);

  axios.get(queryUrl).then(
    function(response) {
      console.log("Movie Title: " + response.data.Title); 
      console.log("Production: " + response.data.Production);
      console.log("Release Year: " + response.data.Year);
      console.log("Rating: " + response.data.imdbRating);
      console.log("Writer: " + response.data.Writer);
      console.log("Director: " + response.data.Director);
      console.log("Actors: " + response.data.Actors);
      console.log("Plot: " + response.data.Plot);
      console.log("Awards: " + response.data.Awards);
      console.log("Website: " + response.data.Website);
    }
  );


  // CREATE movie.txt if non-existant and ADD movie title.  "\r\n" Places the Content on a New Line
  fs.appendFile("movies.txt", movieName + "\r\n", function(err) {
    // log errors
    if (err) {
      console.log(err);
    }
    else {
      console.log("Title added to movies.txt! :D \r\n---------");
    }
  });

}

//SPOTIFY PORTION//

console.log("---------");