const express = require('express');
const allow2 = require('allow2');
const app = express();
const port = 3000;
const config = require('./config.js');

var client = new PlexAPI(config.plex);

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

timer = setInterval(function() {

}, 10000);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
