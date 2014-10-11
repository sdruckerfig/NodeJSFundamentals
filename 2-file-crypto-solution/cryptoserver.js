// require modules
var http = require("http");
var fs = require("fs");
var url = require("url");
var sjcl = require("./sjcl.js");

// create http server
http.createServer(function(request, response) {

	// parse URL as object to use pathname
	var parsedUrl = url.parse(request.url, true);

	// use switch as a (primitive) http router
	switch(parsedUrl.pathname) {

		// display cryptoform.html as default/index page
		case "/": 
		case "/index":
		case "/index.html": {
			var fileName = "./cryptoform.html";
			response.writeHead(200, "OK", {"content-type":"text/html"});
			fs.readFile(fileName, "utf8", function(err, file) {
				response.write(file);
				response.end();
			});
			break;
		}
		// encrypt and return requested file as AJAX result
		case "/getEncryptedFile": {
			// retrieve fileName parameter from URL query string
			var fileName = parsedUrl.query.fileName;

			// declare password and related vars
			var password = "password";
			var encryptedData, output;

			// write header before file retrieval begins			
			response.writeHead(200, "OK", {"content-type":"text/html"});

			// retrieve requested file from file system
			fs.readFile(fileName, "utf8", function(err, file) {
				if(file) {
					// encrypt the file with the password value set above
					encryptedData = sjcl.encrypt(password, file);

					// log the encrypted file (notice it is a JSON object)
					console.log(encryptedData);

					// assign the encrypted file as output
					output = encryptedData;
				} else {
					// error is thrown if file is not found
					console.log(err);

					// provide a no file found notice due to error
					output = '{"ct":"File not found"}';
				}
				// write the output into the response stream, then end
				response.write(output);
				response.end();
			});
			break;	
		}
		// retrieve and return all other files (such as other HTML or JS files)
		default: {
			// prepend the path as needed to retrieve relative to local folder
			var fileName = "." + parsedUrl.pathname;
			
			// determine whether request file is JavaScript, else treat as HTML
			if (fileName.indexOf(".js") > 0) {
				response.writeHead(200, "OK", {"content-type":"text/javascript"});
			} else {
				response.writeHead(200, "OK", {"content-type":"text/html"});				
			}
			// if file is available,
			fs.readFile(fileName, "utf8", function(err, file) {
				if(file) response.write(file);
				response.end();
			});
			break;	
		}
	}

}).listen(9999);