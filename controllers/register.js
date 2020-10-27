
var registerService = require('./../services/register-service')
// var validateResult = require('express-validator');
const {validationResult} = require('express-validator')
let getPageRegister = (req, res) => {
    return res.render("register.handlebars", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
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
        user_password: req.body.password
    };
    try {
        await registerService.createNewUser(newUser);
        console.log(res,"in the try")
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        console.log(err, "erro above register")
        return res.redirect("/register");
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};