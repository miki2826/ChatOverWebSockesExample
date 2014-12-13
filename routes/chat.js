var express = require('express');
var router = express.Router();
var path = require('path');

var html_dir = path.join(__dirname, '../views/');
router.get('/', function (req, res) {
    //TODO: understand query param and decide technology
    var socket = req.query && req.query.st;

    res.render('chat', {
        socket: socket
    });
});

module.exports = router;
