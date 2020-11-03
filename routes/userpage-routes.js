const express = require('express')
var DBConnection = require("../config/DBConnection")
var app = express();
var axios = require('axios');
var loginController = require('../controllers/login-controller');
const userService = require('../Services/user-service');

let userPageRender = async function (app, title) {
  // get request
  app.get("/user", async function (req, res) {
    userService.listGames(req.user, async function (err, games) {
      // Renders the user.handlebars page and sends it the data obj 
      // that contains the requested image/score/title/description and also grabs the user data
      let user = JSON.parse(JSON.stringify(req.user))
      let gamesList = JSON.parse(JSON.stringify(games))
      console.log(gamesList)
      res.render('user', { user: user, gamesList: gamesList })
    })
});
app.post('/user/addGame', function(req, res) { 
  userService.addGame(req.user, req.body.id, req.body.title, function (err, results) {
      if (err) {throw err}
      res.status(201).send('Created');
  });
});

app.post('/user/removeGame', function(req, res) {
  userService.removeGame(req.user, req.body.id, function (err, results) {
      if (err) {throw err}
      res.status(200).send('Success');
  });
})

  app.get("/user", function (req, res) {
    console.log("GET /gameDetails", req.query)
    axios({
      "method": "GET",
      "url": "https://api.rawg.io/api/games/" + req.query.id,
      "headers": {
        "User-Agent": "GamesList/0.1",
        "useQueryString": true
      }, "params": {
        "key": process.env.API_KEY
      }
    })
      .then((response) => {
        let gameDetails = response.data;
        userService.hasGame(req.user, req.query.id, function (err, result) {
          gameDetails.hasGame = result;
          gameDetails.layout = false;
          res.render("partials/games/game-details", gameDetails);
        });
      })
      .catch((error) => {
        console.log(error)
        res.status(500).end(error)
      })

  })
}

module.exports = {userPageRender : userPageRender}