/**
 * Primary file for the API
 * 
 */

// Dependencies
var http = require("http");
var url = require("url");
var stringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");

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

    // Choose the handler that request should go to, If one is not found use the notFound handler
    var choosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handler.notFound;

    // Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryString: queryString,
      method: method,
      headers: headers,
      payload: buffer
    };

    // Route the request to the handler specified in the handler
    choosenHandler(data, function(statusCode, payload) {
      // Use the statuscode called by the handler or use default as 200.
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      // Use the payload called back by the handler or default to an empty object.
      paylaod = typeof(payload) == "object" ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      //  Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response : " + statusCode, payloadString);

    }); 

  });

});

// Start the server and have it listen on the port 3000
server.listen(config.port, function() {
  console.log("The server is listening on port "+config.port+" in "+config.envName+" now ");
});

// Define handlers
var handler = {};

// sample handler
handler.sample = function(data, callback) {
  // Callback a http status code and a payload object
  callback(406, {name: "sample handler"});
};

handler.notFound = function (data, callback) {
  callback(404); 
};

// Define a request router
var router = {
  'sample': handler.sample
};
