const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT id, username FROM users WHERE id = $1', [id]).then((result) => {
    // Handle Errors
    const user = result && result.rows && result.rows[0];

    if (!user) {
      // user not found
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      // user found
      done(null, user);
    }
  }).catch((err) => {
    console.log('query err ', err);
    done(err);
  });
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {
  pool.query('SELECT * FROM users WHERE username = $1', [username])
    .then((result) => {
      const user = result && result.rows && result.rows[0];
      if (user && encryptLib.comparePassword(password, user.password)) {
        // all good! Passwords match!
        done(null, user);
      } else if (user) {
        // not good! Passwords don't match!
        done(null, false, { message: 'Incorrect credentials.' });
      } else {
        // not good! No user with that name
        done(null, false);
      }
    }).catch((err) => {
      console.log('error', err);
      done(null, {});
    });
})));

// passport.use('google', new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
//   function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }));

module.exports = passport;
