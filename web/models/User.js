const mysql = require('./mysqlConnect');
exports.findByName = (name) => {
    return new Promise((resolve, inject) => {
        mysql.query(`select * from users where name = '${name}'`).then(([user]) => {
            resolve(user);
        }).catch(err => {
            inject(err);
        })
    })
}

exports.findByEmail = (email) => {
    return new Promise((resolve, inject) => {
        mysql.query(`select * from users where email = '${email}'`).then(([user]) => {
            resolve(user);
        }).catch(err => {
            inject(err);
        })
    })
}

exports.new = (newUser) => {
    return new Promise((resolve, inject) => {
        
    });
}