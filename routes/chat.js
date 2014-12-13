var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //TODO: understand query param and decide technology
    var socket = req.query && req.query.st;

    var options = {
        script: "/javascripts/chat.client.sockjs.js",
        socket: "https://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js"
    };
    if (socket && socket === "socketio") {
        options = {
            script: "/javascripts/chat.client.socket.io.js",
            socket: "https://cdn.socket.io/socket.io-1.2.1.js"
        };
    }
    res.render('chat', options);

});

module.exports = router;
