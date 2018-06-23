let mongoose = require("mongoose");
let config = require("config");

if(config.util.getEnv("NODE_ENV") !== "test"){
	// use mongoose debug to see connections to DBHOST
	mongoose.set("debug", true);
}
mongoose.connect(config.DBHOST);

mongoose.Promise = Promise;

module.exports.Wine = require("./wines");