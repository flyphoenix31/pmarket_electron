const mysql = require('../models/mysqlConnect');

exports.getBank = () => {
    return new Promise((resolve, reject) => {
        mysql.select("settings", null, {limit: 1}).then(([bank]) => {
            resolve(bank);
        }).catch(err => {
            reject(err);
        })
    });
}