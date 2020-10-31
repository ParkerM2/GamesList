// dependencies
var validationResult = require('express-validator');
var loginService = require('../Services/login-service');

// returning the rendered login page
let getPageLogin = (req, res) => {
    return res.render("login", {
        errors: req.flash("errors")
    });
};

// function for valdating the login results with express-validator
let handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.email, req.body.password);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
};

// function to check to see if a user is logged in
let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

// function to check to see if a user is logged out
let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

// function to logout a user
let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getPageLogin: getPageLogin,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};