const check=require('express-validator')

let validateRegister=[
    check("password","Invalid password. password must be at least 2 chars long")
    .isLength({min:2}),

    check('password',"Invalid password. password must be at least 2 chars long")
    .custom((value,{req})=> {
        return value===req.body.password
    })
];

let validateLogin=[
    check('email',"invalid email").isEmail().trim(),

    check('password', "invalidPassword")
    .not().isEmpty()
];

module.exports ={
    validateRegister: validateRegister,
    validateLogin: validateLogin
};
