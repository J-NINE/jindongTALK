var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var msg;


//app.get('/',function(req, res){
 // res.sendFile(__dirname + '/index.html');
//});

//for use css and sth else
var path = require('path'); 	
app.use(express.static(path.join(__dirname, '/')));

//for connection
var count=1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  var name = "unknown" + count++;
  io.to(socket.id).emit('change name',name);
socket.name = name;
msg = '========= ' + name + ' entered ========='
io.emit('receive message', msg);

	//if disconnect
  socket.on('disconnect', function(){
	 console.log('user disconnected: ' + socket.id);
    	 msg = '=========== ' + socket.name + ' off ============';
	 io.emit('receive message', msg);
  });

	//if client get 'receive message', client append msg into chat window
  socket.on('send message', function(name,text){
    msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(3000, function(){
  console.log('server on!');
});
