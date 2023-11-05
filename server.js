console.log("Socket server is running");
var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	
	socket.on('mouse', mouseMsg);
	
	function mouseMsg(data) {
		//emits to everyone but sender
		socket.broadcast.emit('mouse', data);
		
		// emits to everyone
		// io.sockets.emit('mouse', data);
		
		console.log(data);
	}
}
