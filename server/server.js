const express=require('express'), 
 	  path=require('path'),
 	  http=require('http'),
 	  socketIO=require('socket.io'),
 	  port=process.env.PORT || 3000,
 	  {generateMessage} = require('./utils/message'),
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

	socket.on('createMessage', (message) => {
		io.emit('newMessage',generateMessage(message.from,message.text));
		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log("Disconnected!");
	});
})
// app.get("/",function(req,res){
// 	res.render("index");
// })

server.listen(port,() => {
	console.log("Running on port 3000!");
});