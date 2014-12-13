var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res) {
    res.render('signin', {
        title: 'Login',
        style: 'login.css'
    });
});

module.exports = router;
