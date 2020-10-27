
var registerService = require('./../services/register-service')
// // var validateResult = require('express-validator');
// const {validationResult} = require('express-validator')
// let getPageRegister = (req, res) => {
//     return res.render("register.handlebars", {
//         errors: req.flash("errors")
//     });
// };

// let createNewUser = (req, res) => {
//     //validate required fields
//     let errorsArr = [];
//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         return res.redirect("/register");
//     }

//     //create a new user
//     let user = {
//         user_name: req.body.fullName,
//         email: req.body.email,
//         user_password: req.body.password
//     };
//     console.log(user, "user before try")
//     try {
//         await registerService.createNewUser(user);
//         console.log(res,"in the try")
//         return res.redirect("/login");
//     } catch (err) {
//         req.flash("errors", err);
//         console.log(err, "error above register in register.js")
//         return res.redirect("/register");
//     }
// };
// module.exports = {
//     getPageRegister: getPageRegister,
//     createNewUser: createNewUser
// };


let getRegisterPage = (req, res) => {
    return res.render("register.handlebars");
};

let createNewUser = async (req, res) => {
    try {
      let data = {
          fullname: req.body.fullName,
          email: req.body.email,
          password: req.body.password
      };
      //create a new user
      await registerService.createNewUser(data);
      return res.status(200).json({
          message: "a user create succeeds"
      })
  }catch (e) {
      return res.status(500).json(e);
  }
};
module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};