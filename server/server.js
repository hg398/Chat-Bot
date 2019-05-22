const express=require('express'), 
 	  path=require('path'),
 	  http=require('http'),
 	  socketIO=require('socket.io'),
 	  port=process.env.PORT || 3000,
	  publicPath=path.join(__dirname,'../public');

var app=express(),
	server=http.createServer(app),
	io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
	console.log("New user connected.");

	socket.emit('newMessage', {
		from: 'ankit',
		text: 'see you!',
		createAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log(message);
	});

	socket.on('disconnect', () => {
		console.log("DIsconnected!");
	});
})
// app.get("/",function(req,res){
// 	res.render("index");
// })

server.listen(port,() => {
	console.log("Running on port 3000!");
});