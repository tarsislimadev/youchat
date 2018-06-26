// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('./lib')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var users = {
    numbers: 0
};

io.on('connection', (socket) => {
    var addedUser = false;
    var user = {
        phoneNumber: null,
        online: false
    };

    socket.on('user online', function (data) {
        socket.broadcast.emit('user online', {
            phoneNumber: data.phoneNumber
        });

        user.phoneNumber = data.phoneNumber;
        user.online = true;
    });

    socket.on('new message', (message) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: message
        });
    });

    socket.on('add user', (username) => {
        if (addedUser)
            return;

        socket.username = username;
        ++user.numbers;
        addedUser = true;
        socket.emit('login', {
            numUsers: user.numbers
        });
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: user.numbers
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', () => {
        if (addedUser) {
            --user.numbers;

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: user.numbers
            });
        }
    });
});
