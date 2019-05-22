var socket=io();

socket.on('connect',function(){
	console.log("connected to server");

	socket.emit('createMessage', {
		from: 'Harsh',
		text: 'Yup, that works for me.'
	});
});

socket.on('disconnect',function(){
	console.log("Disconnected from server");
});

socket.on('newMessage',function(message){
	console.log('newMessage',message);
})