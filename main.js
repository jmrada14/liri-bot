require("dotenv").config();

let keys = require("./keys");
let fs = require("fs");
let request = require("request");
let twitter = require("twitter");
let spotify = require("node-spotify-api")
let filename = './log.txt';
var inquirer = require('inquirer');
let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
let header = "================= RESULTS ==================";


function toLog(data) {
    fs.appendFile("log.txt", '\n\r\n', function(err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.appendFile("log.txt", (data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(space + "log.txt was updated!");
    });
}
// =================================================================
// Spotify function, Spotify api
function getSpotify(songName) {
    let spotify = new Spotify(dataKeys.spotify);

    if (!songName) {
        songName = "William and Georgia";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                "=================RESULT==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(output);
            toLog(output);
        }
    });

    let getTwitter = function() {
        let client = new twitter(dataKeys.twitter);
        let params = { screen_name: 'Sairtun', count: 10 };

        client.get('statuses/user_timeline', params, function(err, tweets, res) {
            let data = []; //empty array to hold data

            data.push(space + header);
            if (err) {
                console.log('Error occured: ' + err);
                return;
            } else {
                for (let i = 0; i < tweets.length; i++) {
                    data.push(
                        space + 'Created at: ' + tweets[i].created_at +
                        space + 'Tweet: ' + tweets[i].text + "\n"
                    );
                }
                let newData = data.join('');
                console.log(newData);
                toLog(newData);
            }
        });
    }};