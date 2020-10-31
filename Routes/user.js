//dependencies
var app = require('express')();
var express = require('express')
var homePageController = require("../controllers/home-page");
var registerController = require("../controllers/register");
var loginController = require("../controllers/login-controller");
var passport = require("passport");
var initPassportLocal = require("../controllers/passport-local-controller");
var expressValidator = require('express-validator')
const DBConnection = require('../config/DBConnection')
const { body, validationResult } = require('express-validator');
const {check} = require('express-validator');

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true,
    }));
    router.get("/api/user", function (req,res ) {
        DBConnection.query('SELECT * FROM `users`', function (err, res) {
            if (err) {throw err}
            console.log(res)
            console.log("^ the res")
        }), function (res) {
            console.log("cb", res)
        }});
    router.get("/register", registerController.getPageRegister);
    router.post("/register", [
        check(
            "password", "Invalid password. Password must be at least 2 chars long")
            .isLength({ min: 2 }),
        check(
            "passwordConfirmation", "Password confirmation does not match password")
            .custom((value, { req }) => {
                console.log(req.body.password)
        return value === req.body.password
            })], registerController.createNewUser);
            
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};



///this is the favorites db code 


app.get("/favorites", function(req, res) {
    connection.query("SELECT * FROM games;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("favorite", { games: data });
    });
  });
  
  // Create a new game list 
  app.post("/api/games", function(req, res) {
    connection.query("INSERT INTO games (game) VALUES (?)", [req.body.game], function(err, result) {
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
    connection.query("SELECT * FROM games;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json(data);
    });
  });
  
  // Update a game
  app.put("/api/games/:id", function(req, res) {
    connection.query("UPDATE games SET game = ? WHERE id = ?", [req.body.game, req.params.id], function(err, result) {
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
    connection.query("DELETE FROM games WHERE id = ?", [req.params.id], function(err, result) {
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
module.exports = initWebRoutes;