var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// create all routes and set up logic within those routes where required.

// get request to the home page for all burger
router.get("/", function(req, res) {
    burger.Selectall(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// post to api/burgers the new burger information
router.post("/api/burgers", function(req, res) {

    burger.insertOne(req.body.burger_name, function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

//PUT requests to the specified path (api.burgers/:id) with the specified update.
router.put("/api/burgers/:id", function(req, res) {
    burger.updateOne(req.params.id, function(result) {
        res.json(result);
    });
});

// Export routes for server.js to use.
module.exports = router;
