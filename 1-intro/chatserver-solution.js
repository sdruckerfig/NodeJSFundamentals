
// include the built-in network library
var net = require("net");
// create a server instance
var server = net.createServer();

// create an array to hold client instances
var clients = [];

// create a server connection handler
server.on("connection", function(client){
	
	// client.write("Hello Telnet\n");
	// client.end();

	// assemble a unique client name to display
	client.chatName = client.remoteAddress + "-" + client.remotePort;

	// add a data event handler to this client which writes its data
	// to all clients except itself, preceded by this client's name
	client.on("data", function(data){
		for(var i = 0; i < clients.length; i++) {
			if(client != clients[i]) {
				clients[i].write(client.chatName + ": " + data);				
			}
		}
	});

	// if a client ends it session, remove it from the clients list
	client.on("end", function(){
		clients.splice(clients.indexOf(client), 1);
	});

	// if a client errs, write the error to the log
	client.on("error", function(error){
		console.log(error);
	});

	// add this client to the clients array
	clients.push(client);
});

// cause this server to listen on port 9999
server.listen(9999);