const express = require('express')
var app = express();

var controller = require('../controllers/user-controller')

let userPageRender = function (app) {

app.get("/user", async function (req, res) {
    console.log(" before res=>","user page line 7");
    await controller.getAPI;
    await controller.data;
    res.render("user.handlebars", data)
    console.log("after res =>","userpagerouteline8");
  });

}

module.exports = {userPageRender : userPageRender}