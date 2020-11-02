var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var DBConnection = require("./../config/DBConnection");
var app = express();


// initPassportLocal();

let router = express.Router();

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/collection", function(req, res) {
  DBConnection.query("SELECT * FROM collections;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("wishlist", { collections: data });
  });
});

// Create a new movie
app.post("/api/collection", function(req, res) {
  DBConnection.query("INSERT INTO collections (collection) VALUES (?)", [req.body.collection], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new movie
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all movies
app.get("/api/collections", function(req, res) {
  DBConnection.query("SELECT * FROM collections;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update a movie
app.put("/api/collections/:id", function(req, res) {
  DBConnection.query("UPDATE collections SET collection = ? WHERE id = ?", [req.body.collection, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a movie
app.delete("/api/collections/:id", function(req, res) {
  DBConnection.query("DELETE FROM collections WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });
