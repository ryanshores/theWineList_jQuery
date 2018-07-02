var db = require("../models");

var Wine = db.Wine;

exports.getWines = (req, res) => {
	Wine.find({})
	.then( (wines) =>{
		return res.json(wines);
	})
	.catch( (err) => {
		res.send(err);
	});
};

exports.createWine = (req, res) => {
	var wine = req.body;
	Wine.create(wine)
	.then( (newWine) => {
		return res.status(201).json(newWine);
	})
	.catch( (err) => {
		res.status(206).send(err);
	});
};

exports.getWine = (req, res) => {
	var wineId = req.params.wineid;
	Wine.findById(wineId)
	.then( (wine) => {
		return res.json(wine);
	})
	.catch( (err) => {
		res.send(err);
	});
};

exports.updateWine = (req, res) => {
	var wineId = req.params.wineid;
	Wine.findOneAndUpdate({_id: wineId}, req.body, {new: true})
	.then( (wine) => {
		return res.json({message: "Updated wine!", wine});
	})
	.catch( (err) => {
		res.send(err);
	});
};

exports.deleteWine = (req, res) => {
	var wineId = req.params.wineid;
	Wine.remove({_id: wineId})
	.then( (result) => {
		return res.json({message: "Removed wine.", result});
	})
	.catch( (err) => {
		res.send(err);
	});
};

module.exports = exports;