const passport = require('passport');
const mysql = require('../models/mysqlConnect');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    mysql.select("users", {id: jwt_payload.id, deleted_at: null}).then(([user]) => {
        if (!user) return done(err, false);
        return done(null, user);
    }).catch(err => {
        return done(err, false);
    })
}));