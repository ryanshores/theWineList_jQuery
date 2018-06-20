var mongoose = require("mongoose");

var wineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Name of wine is required."
	},
	type: {
		type: String
	},
	winery: {
		type: String
	},
	year: {
		type: Number
	},
	completed: {
		type: Boolean,
		default: false
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

var Wine = mongoose.model("Wine", wineSchema);

module.exports = Wine;