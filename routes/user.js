// // Setting up the user database testing purposes - Parker
// const express = require('express');
// const db = require('../models');
// let users = [];
// // bcrypt is a node module that helps encrypt the passwords, and adds a unique id
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const { Router } = require('express');

// const userRoute = express.Router();
//     //returns the users list -P
//     userRoute.get('/user', async (req, res) => {
//         // db.User.findAll({}).then(function (users) {
//         res.json(users);
//         // })
//     });

//     //puts the user into the list -P
//     userRoute.post('/user', async (req, res) => {
//         try {
//             const hashedPassword = await bcrypt.hash(req.body.password, 10)
//             const user = { name: req.body.name, password: hashedPassword }
//             users.push(user)
//             res.json(users)
//             res.status(201).send()
//         } catch {
//             res.status(500).send()
//         }
//     });

//     // Checks to see if the password matches the username that is currently stored on file -P
//     userRoute.post('/users/login', async (req, res) => {
//         const user = users.find(user => user.name = req.body.name)
//         if (user == null) {
//             return res.status(400).send('Cannot Find User Name')
//         };
//         try {
//             if (await bcrypt.compare(req.body.password, user.password)) {
//                 res.send('Success')
//             } else {
//                 res.send('Not')
//             };
//         } catch {
//             res.status(500).send()
//         };
//     });

//     // Authentication functions for the login routes
//     function checkAuthenticated(req, res, next) {
//         if (req.isAuthenticated()) {
//             return next()
//         }
//     }

//     function checkNotAuthenticated(req, res ,next) {
//         if (req.isAuthenticated()) {
//             return res.redirect('/')
//         } 
//         next()
//     }

//     // calling GETS/POST for user logins/authentication
//     userRoute.get('/', checkAuthenticated, (req,res) => {
//         res.render('main', {layout: 'index'})
//     })

//     userRoute.get('/login', checkNotAuthenticated, (req, res) => {
//         res.render('login.handlebars')
//     })

//     userRoute.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//         succesRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true
//     }))

//     userRoute.get('/register', checkNotAuthenticated, (req, res) => {
//         res.render('register.handlebars')
//     })

//     userRoute.post('/register', checkNotAuthenticated, async (req, res) => {
//         try {
//             const hashedPassword = await bcrypt.hash(req.body.password, 10)
//             user.push({
//                 id: Date.now().toString(),
//                 name : req.body.name,
//                 email : req.body.email,
//                 password: hashedPassword
//             })
//             res.redirect('/login')  
//         } catch {
//             res.redirect('/register')
//         }
//     })

//     userRoute.delete('/logout', (req,res) => {
//         req.logOut()
//         res.redirect('/login')
//     })

// module.exports = userRoute;


var express = require('express')
var homePageController = require("../controllers/home-page");
var registerController = require("../controllers/register");
var loginController = require("../controllers/login-controller");
var auth = require("../validation/authValidation");
var passport = require("passport");
var initPassportLocal = require("../controllers/passport-local-controller");
var expressValidator = require('express-validator')
const DBConnection = require('../config/DBConnection')
const { body, validationResult } = require('express-validator');
const {check} = require('express-validator')
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