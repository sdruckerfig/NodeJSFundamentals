var http = require("http");
var fs = require("fs");

function start() {

	function requestHandler(request, response) {

		// response.writeHead(200, {"content-type":"text/html"});
		// response.write("Hello Node.js!");
		// response.end();

		var path = "." + request.url;
		if (path == "./") path = "./index.html";

		fs.readFile(path, function(err, data) {
			if (data) {
				response.writeHead(200, {"content-type":"text/html"});
				response.write(data.toString("utf8"));
				response.end();
			} else {
				response.writeHead(404);
				response.end();
			}
		});

	}

	var server = http.createServer(requestHandler);
	server.listen(9999);

}

exports.start = start;