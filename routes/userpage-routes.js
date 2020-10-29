const express = require('express')
var app = express();

var controller = require('../controllers/user-controller')

let userPageRender = function (app) {

app.get("/user", async function (req, res) {
    console.log(" before res=>","user page line 7");
    let data = await controller.getAPI(res);
    
    console.log("after res =>","userpagerouteline8");
  });

}
module.exports = {userPageRender : userPageRender}