/**
 * Primary file for the API
 * 
 * 
 */

// Dependencies
var http = require("http");
var url = require("url");
var stringDecoder = require("string_ decoder").StringDecoder;

// The server should respond to all the requests with a string
var server = http.createServer(function(req, res) {

  // Get the URL and Parse it
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname; 
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string
  var queryString = parsedUrl.query;

  // get the HTTP method
  var method = req.method.toLowerCase()

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload
  var decoder = new stringDecoder("utf-8");
  var buffer = "";

  req.on('data', function(data) {
    buffer += decoder.write(data);
  });

  req.on('end', function() {
    buffer += decoder.end();

    // Send the response
    res.end("Hello World \n");

    // Log the request path
    console.log("Request is received on : " + buffer);
  });

});

// Start the server and have it listen on the port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000");
});


