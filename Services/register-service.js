
const connection = require('./../config/DBConnection');
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            console.log(data, "after salt in register-service")
            let userItem = {
                user_name: data.user_name,
                email: data.email,
                user_password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            connection.query(
                ' INSERT INTO users set ?? ;', userItem,
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

let checkExistEmail = (email) => {
    return new Promise((resolve, reject) => {
        console.log(email, "email inside of promise")
        try {
            connection.query(
                'SELECT * FROM users WHERE email=?', [email],
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let arr = JSON.parse(JSON.stringify(rows))
                    console.log(arr, "arr")
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