// declare the passport

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// function to authenticate the USER
function initialize (passport, getUserByEmail, getUserByID) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
            if (user == null) {
                return done(null, false, { message: "No user with that email"})
            }
            try {
                if ( await bcrypt.compare(password, user.password) ) {
                    return done(null, user);
                } else {
                    return done(null, false, {message : 'Password Wrong'})
                }
            } catch (e) {
                return done(e)
            }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.serializeUser((id, done) => { 
        return done (null, getUserByID(id))
    })
};

module.exports = initialize;

// express documentation of the verify callback function.. still saying that it's requiring a verify callback


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));