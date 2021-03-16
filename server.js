// Dependencies
//var express = require("express");
//var mongojs = require("mongojs");
//var bodyParser = require('body-parser');

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
console.log ('db ', db, 'mongoose ');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome - kq application." });
});

require("./app/routes/site.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
