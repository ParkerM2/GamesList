// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

const app = express();

// bcrypt is a node module that helps encrypt the passwords, and adds a unique id
const bcrypt = require('bcrypt');

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

const db = require("./models");

// Setting up the user database testing purposes - Parker
// declaring empty array to shove the users into - Parker
const users = [];
//returns the users list -P
app.get('/users', (req, res) => {
  res.json(users)
});
//puts the user into the list -P
app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
    } catch {
    res.status(500).send()
  }
});
// Checks to see if the password matches the username that is currently stored on file -P
app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot Find User Name')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not')
    }
  } catch {
    res.status(500).send()
  }
})

// Routes Example 
// =============================================================
// require("./routes/")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
// sequelize isn't correctly set up just yet -{}
// db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
