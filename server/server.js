const express=require('express'), 
 	  path=require('path'),
 	  http=require('http'),
 	  socketIO=require('socket.io'),
 	  port=process.env.PORT || 3000,
 	  {isRealString}=require('./utils/validation'),
 	  {Users}=require('./utils/users'),
 	  {generateMessage, generateLocationMessage} = require('./utils/message'),
	  publicPath=path.join(__dirname,'../public');

var app=express(),
	server=http.createServer(app),
	io=socketIO(server),
	users=new Users();

app.use(express.static(publicPath));

//new user connect
io.on('connection',(socket) => {
	console.log("New user connected.");

	//setting up rooms
	socket.on('join',(params,callback)=> {
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);

		io.to(params.room).emit('updateUserList',users.getUserList(params.room));

		//message to new user
		socket.emit('newMessage',generateMessage('Admin','Welcome to Chat app'));

		//message to all other users about new user in same room
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

		callback();
	});

	//creating a new message by any user
	socket.on('createMessage', (message,callback) => {
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();
	});

	//creating a location message by any user
	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));		
	});

	//disconnect a user
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
		}
	});
})

server.listen(port,() => {
	console.log("Running on port 3000!");
});