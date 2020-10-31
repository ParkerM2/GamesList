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

}
module.exports = {searchPageRender : searchPageRender}