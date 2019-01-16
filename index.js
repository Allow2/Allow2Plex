const express = require('express');
const allow2 = require('allow2');
const app = express();
const port = 3000;
const config = require('./config.js');
const request = require('request');

const version = '1.0.0'; // process.env.npm_package_version ?
console.log('Allow2Plex version ', version);

const PlexAPI = require("plex-api");

const opts = {
    ...config.plex,
    options: {
        identifier: 'efbdacc8-175f-4280-ba98-8fb996a9e6b9',
        product: 'Allow2Plex',
        version: version
    }
};

var client = new PlexAPI(opts);

var timer = null;

var pairing = {

};

var children = {
    68: {
        name: "Cody"
    }
};

app.get('/', (req, res) => res.send('Allow2Plex'));


// https://github.com/Arcanemagus/plex-api/wiki


function check() {
    client.query("/status/sessions").then(function (result) {

        console.log("check", result.MediaContainer);

        if (result.MediaContainer.size > 0) {
            const track = (result.MediaContainer.Track || result.MediaContainer.Metadata)[0];
            console.log(track);
            console.log(track.User.title, ': ', track.title, '(' + track.type + ')');
            console.log('KILL!');

            const player = track.Player;

            const url = 'http://<CLIENT IP>:<CLIENT PORT>/player/playback/playMedia?key=%2Flibrary%2Fmetadata%2F<MEDIA ID>&offset=0&X-Plex-Client-Identifier=<CLIENT ID>&machineIdentifier=<SERVER ID>&address=<SERVER IP>&port=<SERVER PORT>&protocol=http&path=http%3A%2F%2F<SERVER IP>%3A<SERVER PORT>%2Flibrary%2Fmetadata%2F<MEDIA ID>'
        }

    }, function (err) {
        console.error("Check: Could not connect to server", err);
    });
}

client.query("/").then(function (result) {

    console.log("%s running Plex Media Server v%s",
        result.MediaContainer.friendlyName,
        result.MediaContainer.version);

    // array of children, such as Directory or Server items
    // will have the .uri-property attached
    console.log('children:', result._children);

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

    // set up timer to check who is watching what
    timer = setInterval(check, 10000);
    check();

}, function (err) {
    console.error("Could not connect to server", err);
});


