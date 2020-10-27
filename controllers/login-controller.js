
// const {validationResult} = require('express-validator');
// var loginService = require('../Services/login-service');
const passport = require('passport');

// let getPageLogin = (req, res) => {
//     return res.render("login.handlebars", {
//         errors: req.flash("errors")
//     });
// };

// let handleLogin = async (req, res) => {
//     let errorsArr = [];
//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         return res.redirect("/login");
//     }

//     try {
//         await loginService.handleLogin(req.body.email, req.body.password);
//         return res.redirect("/");
//     } catch (err) {
//         req.flash("errors", err);
//         return res.redirect("/login");
//     }
// };

// let checkLoggedIn = (req, res, next) => {

//     if (!req.isAuthenticated()) {
//         return res.redirect("/login");
//     }
//     next();
// };

// let checkLoggedOut = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return res.render("/");
//     }
//     next();
// };

// let postLogOut = (req, res) => {
//     req.session.destroy(function(err) {
//         return res.redirect("/login");
//     });
// };

// module.exports = {
//     getPageLogin: getPageLogin,
//     handleLogin: handleLogin,
//     checkLoggedIn: checkLoggedIn,
//     checkLoggedOut: checkLoggedOut,
//     postLogOut: postLogOut
// };

let getLoginPage = (req, res) => {
  return res.render("login.handlebars");
};

let handleLogin = (req, res,next) => {
   passport.authenticate("local", function(error, user, info) {
       if (error) {
           return res.status(500).json(error);
       }
       if (!user) {
           return res.status(401).json(info.message);
       }
       req.login(user, function (err) {
           if (err) {
               return res.status(500).json(error);
           } else {
               return res.status(200).json(user);
           }
       });
   })(req, res, next);
};

let checkLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) =>{
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getLoginPage: getLoginPage,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};