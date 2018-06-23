let express = require("express");
let app = express();
let morgan = require('morgan');
let createError = require("http-errors");
let port = process.env.PORT || 3000;
let bodyParser = require("body-parser");
let config = require("config");

let wineRoutes = require("./routes/wines");

// dont show log when testing
if(config.util.getEnv("NODE_ENV") !== "test"){
	// use morgan to log to command listen
	app.use( morgan("dev") );
}

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

// for testing
module.exports = app;