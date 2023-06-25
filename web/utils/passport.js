const passport = require('passport');
const mysql = require('../models/mysqlConnect');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    mysql.query(`Select * from users where id = ${jwt_payload.id}`).then((result) => {
        const [user] = result;
        console.log("user:", user);
        if (!user) return done(err, false);
        return done(null, user);
    }).catch(err => {
        return done(err, false);
    })
}));