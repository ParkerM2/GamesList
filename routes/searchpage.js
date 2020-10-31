const axios = require('axios');
const express = require('express');
const app = express();


let searchPageRender = async function (app, title) {

app.get("/search", async function (req, res) {
    // let user = JSON.parse(JSON.stringify(req.user));
    axios({
            "method":"GET",
            "url":"https://chicken-coop.p.rapidapi.com/games",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
            "x-rapidapi-key":"c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be",
            "useQueryString":true
        },"params":{
            "title": req.query.q
        }
    })
        .then((response)=>{
      
        let apiData = {
            apiData : response.data.result
        }
        

        for (var i = 0; i < response.data.result.length; i++) {
            apiData.apiData[i].id = i
        }


        // INSERT INTO games (game_title, id) VALUES (apiData.)
        // let titleObj = {
        //     title: response.data.result.title,
        //     title: response.data[1].result.title,
        //     title: response.data[2].result.title,
        // };
        // console.log(titleObj.title)
        
        // console.log(titleObj)
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
        "url":"https://chicken-coop.p.rapidapi.com/games/" + encodeURIComponent(req.query.title),
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
            "x-rapidapi-key":"c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be",
            "useQueryString":true
        },"params":{
            "platform": encodePlatform(req.query.platform)
        }
    })
    .then((response)=>{
        let gameDetails = response.data.result;
        gameDetails.layout = false
        res.render("partials/games/game-details", gameDetails);
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