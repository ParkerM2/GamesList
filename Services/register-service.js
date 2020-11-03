//dependencies
var DBConnection = require('./../config/DBConnection');
var bcrypt = require('bcrypt')

// function for the creating of a new user
// using bcrypt to give a hashed password
// using express-validator to confirm both passwords match on the form
// and pushing all this info to the msql db, while checking to make sure the email
// hasn't already been used 
let createNewUser = (data) => {
    // console.log(data," in createNewUser")
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let user = {
                email: data.email,
                user_name: data.user_name,
                user_password: bcrypt.hashSync(data.user_password, salt),
                user_pokemon: null,
                user_game_list: null,
            };

            //create a new account
            let query = DBConnection.query(
                ' INSERT INTO users set ? ', user,
                function(err, rows) {
                    if (err) {
                        return reject("Create user failed")
                    }
                    console.log("Create a new user success!")
                    resolve("Create a new user successful");
                }
            );
            console.log(query.sql, "query.sql");
        }
    });
};

// Querying the mysql db to check if an email is already being used
let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};