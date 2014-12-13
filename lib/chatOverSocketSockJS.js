var sockjs = require('sockjs');

//Create SockJS configuration
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"};
var conns = [];

//Create SockJS server
var sockjs_chat = sockjs.createServer(sockjs_opts);
//Handle a connection
sockjs_chat.on('connection', function (conn) {
    //Save the connection in an array
    conns.push(conn);
    //Handle messages
    conn.on('data', function (message) {
        //Send the message back to all the connections
        for(var i = 0; i < conns.length; i++) {
            conns[i].write(message);
        }
    });
    //Handle connection loss or close
    conn.on("close", function () {
        //Remove the connection from the array
        conns.splice(conns.indexOf(conn), 1);
    });
});

module.exports = sockjs_chat;
