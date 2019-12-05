var fs = require('fs');
var request = require('request');
var ig = require('instagram-scraping');
var express = require('express');
var app = express();
var path = require("path");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function() {
  console.log('Our app is running on port:' + port);
  setInterval(function(){
    ig.scrapeTag('cuoredinapoli').then(result => {
      for (let i = 0; i < 27; i++) {
        download(result.medias[i].display_url, './images/'+i+'.jpg', function(){
          console.log('image number '+i+ ' downloaded');
        });
      }
    });
  },30000);
});

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};