//dependencies
var express = require('express')
var homePageController = require("../controllers/home-page");
var registerController = require("../controllers/register");
var loginController = require("../controllers/login-controller");
var passport = require("passport");
var initPassportLocal = require("../controllers/passport-local-controller");
var expressValidator = require('express-validator')
const DBConnection = require('../config/DBConnection')
const { body, validationResult } = require('express-validator');
const {check} = require('express-validator');

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true,
    }));
    router.get("/api/user", function (req,res ) {
        DBConnection.query('SELECT * FROM `users`', function (err, res) {
            if (err) {throw err}
            console.log(res)
            console.log("^ the res")
        }), function (res) {
            console.log("cb", res)
        }});
    router.get("/register", registerController.getPageRegister);
    router.post("/register", [
        check(
            "password", "Invalid password. Password must be at least 2 chars long")
            .isLength({ min: 2 }),
        check(
            "passwordConfirmation", "Password confirmation does not match password")
            .custom((value, { req }) => {
                console.log(req.body.password)
        return value === req.body.password
            })], registerController.createNewUser);
            
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;