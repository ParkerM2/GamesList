// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

const app = express();

const PORT = 8080;
// declaring the route of the user login
const userController = require('./controllers/user_controller')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

const db = require("./models");


// Routes Example 
// =============================================================
// user login route
app.use(userController)


// Syncing our sequelize models and then starting our Express app
// =============================================================
// sequelize isn't correctly set up just yet -{}
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
