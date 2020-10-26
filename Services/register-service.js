
var DBConnection = require('./../config/DBConnection');
var bcrypt = require('bcrypt')

let createNewUser = (data) => {
    console.log(data," in createNewUser")
    return new Promise(async (resolve, reject) => {
        console.log(resolve, reject, "resolve, reject in new Promise")
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let user = {
                fullname: data.fullname,
                email: data.email,
                user_password: bcrypt.hashSync(data.password, salt),
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

let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                'SELECT * FROM users;',
                function(err, res) {
                    if (err) {
                        throw err;
                    }

                    console.log(JSON.parse(JSON.stringify(res)));

                    let responseArr = JSON.parse(JSON.stringify(res));
                    // if (email.length > 0) {
                    //     resolve(true)
                    //  } else {
                    //     resolve(true)
                    //  }
                    responseArr.map(item => {if (item.email !== email) return resolve })
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