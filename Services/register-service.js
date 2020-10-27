
var DBConnection = require('./../config/DBConnection');
var bcrypt = require('bcrypt')

let createNewUser = (data) => {
    console.log(data," in createNewUser")
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
            DBConnection.query(
                ' INSERT INTO users set ? ', user,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

;

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