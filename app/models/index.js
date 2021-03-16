const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
console.log ('db url ', db.url);
db.sites = require("./site.model.js")(mongoose);

module.exports = db;