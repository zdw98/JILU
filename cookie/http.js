var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// respond with "hello world" when a GET request is made to the homepage
app.get('/login', function(req, res) {
    var logincount = req.cookies.logincount;
    if (logincount) {
        res.send("嗨！" + req.cookies.username + "你登陆了" + req.cookies.logincount + '次')
    } else {
        res.sendfile('login.html');
    }
})
app.post('/login', bodyParser.json(), function(req, res) {
    console.log(req.body); // { username: 'name', pwd: 'msg' }
    if (req.body.username == 'zhangsan' && req.body.pwd == '123') {
        if (!req.cookies.logincount) {
            res.cookie('username', req.body.username)
            res.cookie('logincount', '1')
        } else {
            var num = req.cookies.logincount++;
            res.cookie('logincount', num)
        }
        res.redirect('/login')
    }
});
app.listen(8081);