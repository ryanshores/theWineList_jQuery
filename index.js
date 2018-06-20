var express = require("express");
var app = express();
var morgan = require('morgan');
var createError = require("http-errors");
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var wineRoutes = require("./routes/wines");

app.use( morgan("dev") );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.use("/api/wine", wineRoutes);

app.use( (req, res, next) => {
	next(createError(404));
});

app.use( (err, req, res, next) => {
	res.status(404).send(err);
});

app.listen(port, () => {
	console.log("Server is running on " + port);
});

