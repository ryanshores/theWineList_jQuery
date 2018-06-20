var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/winelist");

mongoose.Promise = Promise;

module.exports.Wine = require("./wines");