const passport = require('passport');
const mysql = require('../models/mysqlConnect');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const sql = `select * from users where id=${jwt_payload.id} and deleted_at is null;
    select permissions.id, permissions.name from role_has_permissions, permissions where role_has_permissions.permission_id = permissions.id and role_id = (SELECT role_id FROM users where id = ${jwt_payload.id})`;
    mysql.query(sql).then(([[user], permissions]) => {
        if (!user) return done(null, false);
        user.permissions = permissions;
        return done(null, user);
    }).catch(err => {
        return done(err, false);
    })
    // mysql.select("users", {id: jwt_payload.id, deleted_at: null}).then(([user]) => {
    //     if (!user) return done(err, false);
    //     return done(null, user);
    // }).catch(err => {
    //     return done(err, false);
    // })
}));