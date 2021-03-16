module.exports = app => {
    const sites = require("../controllers/site.controller.js");
  
    var router = require("express").Router();
  
    // Create a new vaccine site
    router.post("/", sites.create);
  
    // Retrieve all sites
    router.get("/", sites.findAll);
  
    // Retrieve all published sites
    router.get("/published", sites.findAllPublished);
  
    // Retrieve a single site with id
    router.get("/:id", sites.findOne);
  
    // Update a Site with id
    //router.put("/:id", sites.update);

    // Update a Site with (name)? If document doesn't exist create  
    router.put("/:name", sites.upsert);
  
    // Delete a Site with id
    router.delete("/:id", sites.delete);
  
    // Create a new Site
    router.delete("/", sites.deleteAll);
  
    app.use('/api/sites', router);
    
  };