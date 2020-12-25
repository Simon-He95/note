var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    const nickname = 'user' + Math.ceil((Math.random() * 1000))
    io.emit('connection', nickname + ' connected')

    socket.on('chat message', (msg) => {
        io.emit('chat message', nickname + ': ' + msg)
    })
})

http.listen(3000, function() {
    console.log('listening on *:3000');
});