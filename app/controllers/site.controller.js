/**
 * Created by kquigley 3/2021.
 * Mongo database calls for create/delete/update/get vaccine sites
 * Originally coded in promise style; converted some methods to async/await as demonstration
 * Prefer async / await for concise coding.
 */
const db = require("../models");
const Site = db.sites;


// Find a single Site with an id
// NOTE: Rewritten for async/await; unanticipated errors passed out to routes via asynchHandler 
module.exports.findOne = async (id) => {

  const site = await Site.findById(id);
  if (!site) return ({ message: "Site with id= " + id + " not found." });
  else return (site);
};

// Delete a Site with the specified id in the request
// NOTE: Converted to async / await; errors handled at router level via asyncHandler
module.exports.delete = async (id) => {

  const deleted = await Site.findByIdAndRemove(id);
  if (deleted) return ({ message: "Site was deleted successfully " });
  else return ({ message: "Could not delete Site with id=" + id });

};


// Create and Save a new Site
module.exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Site
  const site = new Site({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    website: req.body.website,
    dphLink: req.body.dphLink,
    signUpLink: req.body.signUpLink,
    hasAvailability: req.body.hasAvailability,
    availability: req.body.availability,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  })

  // Save Site in the database
  site
    .save(site)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Site."
      });
    });

};


// Update a Site by the id in the request
module.exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Site.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Site with id=${id}. Maybe Site was not found!`
        });
      } else res.send({ message: "Site was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Site with id=" + id
      });
    });

};

// Update a Site by the name in the request
module.exports.upsert = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const name = req.params.name;
  console.log(' name ', name);

  const query = { name: name };

  Site.findOneAndUpdate(query, req.body, { new: true, upsert: true, useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Site with id=${name}. Maybe Site was not found!` // this error should not occur; should create if not found
        });
      } else res.send({ message: "Site was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Site with name=" + name
      });
    });

};

// Retrieve all Sites from the database.
// NOTE: Rewritten for async/await; errors passed out to routes via asynchHandler 
// ALso note: Mongoose does not deal with queries as async await... thus no await
module.exports.findAll = async (siteName) => {

  var condition = siteName ? { name: { $regex: new RegExp(siteName), $options: "i" } } : {};
  try {
    const site = Site.find(condition);
    return site;
  }
  catch (err) {
    console.log("Error retrieving Sites");
    return (err);

  };

};


// Delete all Sites from the database.
module.exports.deleteAll = (req, res) => {
  Site.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Sites were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sites."
      });
    });

};

// Find all published Sites
exports.findAllPublished = (req, res) => {
  Site.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sites."
      });
    });

};