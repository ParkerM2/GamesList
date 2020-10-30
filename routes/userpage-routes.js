const express = require('express')
var app = express();

var controller = require('../controllers/user-controller')

let userPageRender = function (app) {


// get request
app.get("/user", async function (req, res) {

controller.getAPI(res)
console.log(req.JSON.Parse(JSON.stringify(user)))

})}
module.exports = {userPageRender : userPageRender}