var express = require("express");
var app = express();

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.get("/auth", function (req, res) {
	res.sendFile(__dirname + '/src/auth.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});