let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let user = require("./routes/user.js");
let project = require("./routes/project.js");
let issue = require("./routes/issue.js");
let task = require("./routes/task.js");
let test = require("./routes/test.js");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use("/user", user);
app.use("/project", project);
app.use("/issue", issue);
app.use("/task", task);
app.use("/test", test);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


module.exports = app;
