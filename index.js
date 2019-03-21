/**
 * Primary file for the API
 * 
 * 
 */

// Dependencies
var http = require("http");
var url = require("url");

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

  // Send the response
  res.end("Hello World \n");

  // Log the request path
  console.log("Request is received on :" + trimmedPath, method, queryString);
});

// Start the server and have it listen on the port 3000
server.listen(3000, function() {
  console.log("The server is listening on port 3000");
});


