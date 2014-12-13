var socketio = require('socket.io');

function create(server) {
    var io = socketio(server);

    //Socket handling connection
    io.sockets.on('connection', function(socket){
        //Handle Messages
        socket.on('message', function(message){
            //Send the message back to all the connections
            io.sockets.emit('message', message);
        });
    });
}

module.exports = create;

