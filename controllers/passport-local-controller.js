// dependencies 
var passportLocal = require('passport-local');
var passport = require('passport');
var loginService = require('../Services/login-service');
let LocalStrategy = passportLocal.Strategy;


// LINK FOR DOCS ON PASSPORT FOR HELP -> http://www.passportjs.org/docs/
// setting up the new strategy for the passport node package
let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                await loginService.findUserByEmail(email).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", "This user email "+ email +" doesn't exist"));
                    }
                    if (user) {
                        let match = await loginService.comparePassword(password, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("errors", match)
                            )
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

// serializing the user - passport docs http://www.passportjs.org/docs/
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializing the user - passport docs http://www.passportjs.org/docs/
passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;