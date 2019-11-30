var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var user = require('./routes/user.js');
var project = require('./routes/project.js');
var issue = require('./routes/issue.js');
var task = require('./routes/task.js');
var test = require('./routes/test.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use('/user', user);
app.use('/project', project);
app.use('/issue', issue);
app.use('/task', task);
app.use('/test', test);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


module.exports = app;
