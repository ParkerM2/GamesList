// dependencies 
var express = require('express')
var homePageController = require("../controllers/home-page");
var registerController = require("../controllers/register");
var loginController = require("../controllers/login-controller");
var initPassportLocal = require("../controllers/passport-local-controller");
var passport = require('passport');


let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getLoginPage);
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
    router.get("/register", registerController.getRegisterPage);
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

// initPassportLocal();

// var router = express.Router();
// let initWebRoutes = (app) => {
//     router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
//     router.post("/logout", loginController.postLogOut);

//     router.get("/register", registerController.getRegisterPage );
//     router.post("/register-new-user", registerController.createNewUser);

//     router.get("/login",loginController.checkLoggedOut, loginController.handleLogin);
//     router.post("/login", loginController.handleLogin);
//     return app.use("/", router);
// };

// module.exports = initWebRoutes;