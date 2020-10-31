const axios = require('axios');
const express = require('express');
const app = express();


let searchPageRender = async function (app) {

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
        "title": "tomb raider"
        }
    })
        .then((response)=>{
        let titleObj = {
            title: response.data.result[0].title,
            title: response.data.result[1].title,
            
        };
        console.log(titleObj.title)
        
         console.log(titleObj, "title OBJ")
        // console.log(titleObj)
        res.render("search",titleObj)
    })
        .catch((error)=>{
        console.log(error)
    })
});

}
module.exports = {searchPageRender : searchPageRender}