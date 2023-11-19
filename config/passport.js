const passport = require('passport');
const { validPassword } = require('../lib/passwordUtils.js');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;


const customFields = {
    username: 'uname',
    password: 'pw'
}
const verifyCallback = (username, password, done) => {
    console.log(username);
    console.log(password);
    console.log(User);
    User.findOne({ username: username })
        .then((user) => {
            console.log(user);

            if (!user) {
                return done(null, false);
            }

            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
};

const Strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(Strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})