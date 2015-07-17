var JwtStrategy = require('passport-jwt').Strategy,
    User = require('../app/users/users.model');

module.exports = function (passport) {
    var opts = {}
    opts.secretOrKey = 'secret';
    opts.issuer = "accounts.examplesoft.com";
    opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({
            id: jwt_payload.sub
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account
            }
        });
    }));
}