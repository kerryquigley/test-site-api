/**
 * Created by kquigley 3/2021.
 * Routes for create/delete/update/get vaccine sites
 * Originally coded in promise style; converted some methods to async/await as demonstration
 * Prefer async / await for concise coding.
 * Added 3rd party wrapper asyncHandler for error handling on async/await calls.
 */

module.exports = app => {
  const sites = require("../controllers/site.controller.js");
  const router = require("express").Router();
  const asyncHandler = require('express-async-handler');

  // Retrieve a single site with id; errors hanlded via asyncHandler
  router.get("/:id", asyncHandler(async (req, res, next) => {
    const site = await sites.findOne(req.params.id);
    res.json(site);

  }));

  // Delete a Site with id
  router.delete("/:id", asyncHandler(async (req, res, next) => {
    const deleted = await sites.delete(req.params.id);
    res.json(deleted);
  }));

  // Retrieve all published sites
  router.get("/published", sites.findAllPublished);

  // Create a new vaccine site
  router.post("/", sites.create);

  // Update a Site with (name)? If document doesn't exist create  
  router.put("/:name", sites.upsert);

  // Gets all sites or gets site specifed by site name
  router.get("/", asyncHandler(async (req, res, next) => {
    //   if there is an error thrown in routes, asyncHandler
    //   will pass it to next() and express will handle the error;
    const vaccineSites = await sites.findAll(req.query.siteName);
    res.json(vaccineSites);

  }));

  // Delete all sites
  router.delete("/", sites.deleteAll);

  app.use('/api/sites', router);

};