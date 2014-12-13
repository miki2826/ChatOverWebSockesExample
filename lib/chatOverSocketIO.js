var socketio = require('socket.io');

function create(server) {
    var io = socketio(server);

    // Socket handling
    io.sockets.on('connection', function(socket){
        socket.on('message', function(message){
            console.log('received message:', message);
            io.sockets.emit('message', message);
        });
    });
}

module.exports = create;

