/*
var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });

    response.write("Simple Simple Fun")
    response.end();
}).listen(5002);
*/

var express = require("express");
var app = express();
var client = "src/client/";

/* serves main page */
app.use(express.static('./src/client/'));
app.use(express.static('./'));
app.use('/*', express.static('./src/client/index.html'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
