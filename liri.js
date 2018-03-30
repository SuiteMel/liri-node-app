require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var param = process.argv[2];

switch (param) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifySong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doIt();
    break;
  default:
    console.log("This command was not recognized");
    console.log("Valid commands are 'my-tweets', 'spotify-this-song', 'movie-this', and 'do-what-it-says'.");
    break;
}

function myTweets() {
  var twitterUser = { screen_name: 'SuiteMule' };
  client.get('statuses/user_timeline', twitterUser, function (error, tweets, response) {
    var size = tweets.length;

    if (!error) {
      console.log(twitterUser.screen_name + "'s Recent Tweets");
      if (size > 9) {
        var size = 9;
      }
    }

    for (i = 0; i < size; i++) {
      var text = tweets[i].text;
      var time = tweets[i].created_at;
      console.log(text + " Posted: " + time);
      console.log("----------------");
    }
  })
}

function spotifySong() {
  var search = process.argv.slice(3).join(" ");

  if (search === "") {
    var search = "The Sign by Ace of Base";
  }
  spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var music = data.tracks.items;
    var artist = music[0].album.artists[0].name;
    var song = music[0].name;
    var album = music[0].album.name;
    var preview = music[0].preview_url;
    console.log(song + " by " + artist + " from the album " + album);
    console.log("Listen here: " + preview);
  });
}

function movieThis() {
  var search = process.argv.slice(3).join("+");

  if (search === "") {
    var search = "Mr. Nobody";
  }

  request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var result = JSON.parse(body);
    var title = result.Title;
    var year = result.Year;
    var imdbRating = result.imdbRating;
    var tomatoRating = result.Ratings[1].Value;
    var country =  result.Country;
    var lang = result.Language;
    var plot = result.Plot;
    var actors = result.Actors;
    console.log(title + " (" + year + ")");
    console.log(plot);
    console.log("Featuring " + actors);
    console.log("Languages: " + lang + ". Countries: " + country);
    console.log("Ratings: IMDB " + imdbRating + ", Rotten Tomatoes " + tomatoRating);
    
  }
});
}

function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
  
    var dataArr = data.split(",");
    param = dataArr[0];
    console.log(dataArr[0] + " " + dataArr[1]);
   
  });
}