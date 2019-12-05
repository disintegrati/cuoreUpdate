var fs = require('fs'),
    request = require('request'),
    ig = require('instagram-scraping');

ig.scrapeTag('cuoredinapoli').then(result => {
  for (let i = 0; i < 27; i++) {
    download(result.medias[i].display_url, './images/'+i+'.jpg', function(){
      console.log('image number '+i+ ' downloaded');
    });
  }
});

function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
