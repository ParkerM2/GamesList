var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@SEwasd17",
  database: "collection_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Use Handlebars to render the main index.html page with the movies in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM collection;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { colections: data });
  });
});

// Create a new game list 
app.post("/api/games", function(req, res) {
  connection.query("INSERT INTO collections (game) VALUES (?)", [req.body.movie], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new game
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Retrieve all games
app.get("/api/games", function(req, res) {
  connection.query("SELECT * FROM collections;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Update a game
app.put("/api/games/:id", function(req, res) {
  connection.query("UPDATE collections SET game = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {
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

// Delete a game
app.delete("/api/games/:id", function(req, res) {
  connection.query("DELETE FROM collections WHERE id = ?", [req.params.id], function(err, result) {
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

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
