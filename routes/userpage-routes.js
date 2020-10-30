const express = require('express')
var controller = require("../config/DBConnection")
var app = express();

var controller = require('../controllers/user-controller')

let userPageRender = function (app) {


// get request
app.get("/user", async function (req, res) {
    console.log(" before res=>","user page line 7");
    controller.getAPI(res)
    console.log(JSON.parse(JSON.stringify(req.user)));
    console.log("after res =>","userpagerouteline8");

  });


// controller.getAPI(res)
// console.log(req.JSON.Parse(JSON.stringify(user)))

}
module.exports = {userPageRender : userPageRender}