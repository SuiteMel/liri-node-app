# liri-node-app

LIRI is a command line node app that takes in parameters and gives you back data. This data will also be logged to a log.txt file for you future reference.

The commands that you can run in LIRI and what they do are as follows:

`my-tweets` - This will display the last 20 tweets by the user SuiteMule.

`spotify-this-song <song name here>` - This will display information about the first returned search result of the song you inputted. If you leave the search parameter blank it will search for the default song.

`movie-this <movie name here>` - This will display information about the movie you searched for. If you leave the search parameter blank it will search for the default movie.

`do-what-it-says` - This will run the command that has been written in the random.txt document.

Remember, every output will be added to the log.txt file for you future reference.

[Watch the demo](https://1drv.ms/v/s!Agc5EnoVi7OrhIgUkpa_0IxnO8vJOg).

## How to get started
This app uses node.js and npm. In your console type `npm install` to aquire the required node libraries to run this app. You will also need to add your own .env file with your personal keys for twitter and spotify in order to utilize their apis and utilize the `my-tweets` and `spotify-this-song` commands.