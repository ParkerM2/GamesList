//dependencies 
var registerService = require('./../Services/register-service');
const {validationResult} = require('express-validator');

// Express-validator docs link -> https://express-validator.github.io/docs/
// sending the register handlebars page
let getPageRegister = (req, res) => {
    return res.render("register", {
        errors: req.flash("errors")
    });
};

// function for creating a new validated user
let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    // validationResult() is a express-validator function
    // comes with a lot of premade methods to check for email address/password matches/
    // credit cards etc
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }

    //create a new user
    let newUser = {
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.password,
        user_pokemon: null,
        //user_game_list: null,
    };
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};