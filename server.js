// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));




// Routes Example 
// =============================================================
// user login route
// require("./routes/chicken-api-route")(app);
require('./routes/user')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// sequelize isn't correctly set up just yet -{}
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
