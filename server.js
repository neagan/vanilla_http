'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  // Time route
  if (req.url === '/time') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    var date = new Date();
    res.write(JSON.stringify({msg: date.getHours() + ':' + date.getMinutes()}));
    res.end();
  // Greet route
  } else if (req.url.slice(0, 6) === '/greet') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    // POST request
    if (req.method === 'POST') {
      req.on('data', function(data) {
        var body = JSON.parse(data.toString('utf-8'));
        res.write(JSON.stringify({msg: 'hello ' + body.name}));
        res.end();
      });
    // Name in url
    } else {
      var body = req.url.slice(7);
      res.write(JSON.stringify({msg: 'hello ' + body}));
      res.end();
    }
  // Not found
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
});

server.listen(3000, function() {
  console.log('Server started');
});
