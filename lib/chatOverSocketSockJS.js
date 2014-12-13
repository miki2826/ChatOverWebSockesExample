var sockjs = require('sockjs');

var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"};

var conns = [];

var sockjs_chat = sockjs.createServer(sockjs_opts);
sockjs_chat.on('connection', function (conn) {
    conns.push(conn);
    conn.on('data', function (message) {
        for(var i = 0; i < conns.length; i++) {
            conns[i].write(message);
        }
    });

    conn.on("close", function () {
        // Remove the connection from the list
        conns.splice(conns.indexOf(conn), 1);
    });
});

module.exports = sockjs_chat;
