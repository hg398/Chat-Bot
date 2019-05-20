const express=require('express'), 
	  app=express(),
 	  path=require('path'),
 	  port=process.env.PORT || 3000;
	  publicPath=path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.listen(port,function(){
	console.log("Running on port 3000!");
})