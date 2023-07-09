const mysql = require('./mysqlConnect');

exports.getActiveAccount = () => {
    return new Promise((resolve, reject) => {
        mysql.select("mail_accounts", { is_default: 1 }).then(([mailAccount]) => {
            resolve(mailAccount);
        }).catch(err => {
            reject(err);
        })
    })
}