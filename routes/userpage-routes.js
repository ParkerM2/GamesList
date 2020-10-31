const express = require('express')
var controller = require("../config/DBConnection")
var app = express();
var axios = require('axios');
var controller = require('../controllers/user-controller')

let userPageRender = async function (app) {


// get request
app.get("/user", async function (req, res) {
    console.log(" before res=>","user page line 7");
    let user = JSON.parse(JSON.stringify(req.user));
    axios({
      "method":"GET",
      "url":"https://chicken-coop.p.rapidapi.com/games/%7BHalf-Life%7D",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"chicken-coop.p.rapidapi.com",
      "x-rapidapi-key":"c23b869635mshbd93a4ffe3425ecp12d50bjsnae0f66b387be",
      "useQueryString":true
      },"params":{
      "platform":"pc"
      }
      })
      .then((response)=>{
      let data = {
        img : response.data.result.image,
        score : response.data.result.score,
        title : response.data.result.title,
        description : response.data.result.description,
        user: user,
      }
      // Renders the user.handlebars page and sends it the data obj 
      // that contains the requested image/score/title/description and also grabs the user data
      res.render("user", data)
      })
      .catch((error)=>{
        console.log(error)
      })
});
    // controller.getAPI(res)
    // console.log(JSON.parse(JSON.stringify(req.user)));
    // console.log("after res =>","userpagerouteline8");



// controller.getAPI(res)
// console.log(req.JSON.Parse(JSON.stringify(user)))

}
module.exports = {userPageRender : userPageRender}