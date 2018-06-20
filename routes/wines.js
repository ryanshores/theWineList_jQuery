var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/wines");

router.route("/")
.get(helpers.getWines)
.post(helpers.createWine);

router.route("/:wineid")
.get(helpers.getWine)
.put(helpers.updateWine)
.delete(helpers.deleteWine);


module.exports = router;