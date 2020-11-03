const axios = require('axios');
const express = require('express');
const app = express();
const loginController = require('../controllers/login-controller')
const userService = require('../Services/user-service');

let searchPageRender = async function (app, title) {

app.get("/search", loginController.checkLoggedIn, async function (req, res) {
    // let user = JSON.parse(JSON.stringify(req.user));
    axios({
        "method":"GET",
        "url":"https://api.rawg.io/api/games",
        "headers":{
            "User-Agent": "GamesList/0.1",
            "useQueryString":true
        },"params":{
            "search": req.query.q,
            "ordering": "-rating",
            "key": '78840b4e2017430cb72fc273ed6f1530'
        }
    }).then((response)=>{
      
        let apiData = {
            results: response.data.results,
            query: req.query.q,
            user : req.user
        }
        res.render("search", apiData)
    })
        .catch((error)=>{
        console.log(error)
    })
});

app.get("/gameDetails", function(req, res) {
    console.log("GET /gameDetails", req.query)
    axios({
        "method":"GET",
        "url":"https://api.rawg.io/api/games/" + req.query.id,
        "headers":{
            "User-Agent": "GamesList/0.1",
            "useQueryString":true
        },"params":{
            "key": '78840b4e2017430cb72fc273ed6f1530'
        }
    })
    .then((response)=>{
        let gameDetails = response.data;
        userService.hasGame(req.user, req.query.id, function(err, result) {
            gameDetails.hasGame = result;
            gameDetails.layout = false;
            
            res.render("partials/games/game-details", gameDetails);
        });    
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).end(error)
    })
});
}

function encodePlatform(platform) {
    switch(platform.toLowerCase()) {
        case 'ps4': return 'playstation-4';
        case 'ps3': return 'playstation-3';
        case 'ps2': return 'playstation-2';
        // case 'xone': return 'xbox-one';
        default: return platform.toLowerCase();
    }
}

module.exports = {searchPageRender : searchPageRender}