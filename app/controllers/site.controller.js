
const db = require("../models");
const Site = db.sites;

// Create and Save a new Site
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Site
  const site = new Site({
    //siteName: req.body.siteName,
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

// Retrieve all Sites from the database.
exports.findAll = (req, res) => {
    const siteName = req.query.siteName;
    var condition = siteName ? { name: { $regex: new RegExp(siteName), $options: "i" } } : {};
  
    Site.find(condition)
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

// Find a single Site with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Site.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Site with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Site with id=" + id });
      });
  
};

// Update a Site by the id in the request
exports.update = (req, res) => {
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
exports.upsert = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
  
    const name = req.params.name;
    console.log (' name ', name);
    
    const query = {name: name};
    console.log (query);
    //Site.findAndModify(name, req.body, { upsert: true, new: true })
    //Site.findOneAndUpdate(query, {hasAvailability: req.body.hasAvailability, availability: req.body.availability}, { upsert: true, useFindAndModify: false })
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

// Delete a Site with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Site.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Site with id=${id}. Maybe Site was not found!`
          });
        } else {
          res.send({
            message: "Site was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Site with id=" + id
        });
      });
};

// Delete all Sites from the database.
exports.deleteAll = (req, res) => {
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