var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  //socket.broadcast.emit('user joined',"user-connected");
  //socket.broadcast.emit('user left',"user-disconnected");  
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');
    socket.broadcast.emit('online', name+ ' online');  
  });
  socket.on('disconnect', function(){
    io.emit('disconnect', socket.nickname+"-disconnected");
  });
  socket.on('chat message', function(msg){
    msg = socket.nickname+": "+msg;
    io.emit('chat message', msg);
  });
  socket.on('typing', function(msg){
    msg = socket.nickname+": "+msg;
    io.emit('live-type', msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});


