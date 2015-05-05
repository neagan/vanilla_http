'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  if (req.url === '/time') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    var date = new Date();
    res.write(date.getHours() + ':' + date.getMinutes());
    res.end();
  } else if (req.url === '/greet') {
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
    } else {
      res.write(JSON.stringify({msg: 'hello ' + req.url}));
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
