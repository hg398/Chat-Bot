const express=require('express'), 
 	  path=require('path'),
 	  http=require('http'),
 	  socketIO=require('socket.io'),
 	  port=process.env.PORT || 3000,
 	  {generateMessage, generateLocationMessage} = require('./utils/message'),
	  publicPath=path.join(__dirname,'../public');

var app=express(),
	server=http.createServer(app),
	io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
	console.log("New user connected.");

	//message to new user
	socket.emit('newMessage',generateMessage('Admin','Welcome to Chat app'));

	//message to all other users 
	socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

	socket.on('createMessage', (message,callback) => {
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));		
	});

	socket.on('disconnect', () => {
		console.log("Disconnected!");
	});
})

server.listen(port,() => {
	console.log("Running on port 3000!");
});