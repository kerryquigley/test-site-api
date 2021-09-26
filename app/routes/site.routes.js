module.exports = app => {
  const sites = require("../controllers/site.controller.js");
  const router = require("express").Router();
  const asyncHandler = require('express-async-handler');


  // Create a new vaccine site
  router.post("/", sites.create);

  // Gets all sites or gets site specifed by site name
  router.get("/", asyncHandler(async (req, res, next) => {
    /* 
      if there is an error thrown in routes, asyncHandler
      will pass it to next() and express will handle the error;
    */
    const vaccineSites = await sites.findAll(req.query.siteName);
    res.json(vaccineSites);

  }));

  // Retrieve all published sites; erros hanlded via asyncHandler
  router.get("/published", sites.findAllPublished);

  // Retrieve a single site with id
  router.get("/:id", asyncHandler(async (req, res, next) => {
    const site = await sites.findOne(req.params.id);
    res.json(site);

  }));


  // Update a Site with (name)? If document doesn't exist create  
  router.put("/:name", sites.upsert);

  // Delete a Site with id
  router.delete("/:id", sites.delete);

  // Create a new Site
  router.delete("/", sites.deleteAll);

  app.use('/api/sites', router);

};