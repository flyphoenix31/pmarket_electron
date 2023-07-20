const { getProperPagination } = require('../utils');
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

exports.findById = (id) => {
    return new Promise((resolve, inject) => {
        mysql.query(`select * from users where id = '${id}'`).then(([user]) => {
            resolve(user);
        }).catch(err => {
            inject(err);
        })
    })
}

exports.new = (newUser) => {
    return new Promise((resolve, reject) => {
        mysql.insertOne('users', newUser).then(user => {
            resolve(user)
        }).catch(err => {
            reject(err);
        });
    });
}

exports.update = (cond, updatedUser) => {
    return new Promise((resolve, reject) => {
        mysql.update('users', cond, updatedUser).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = (cond, page_, perPage_, extra) => {
    return new Promise((resolve, reject) => {
        mysql.select("users", cond, { isGetCount: true }).then(totalCount => {
            let {page, perPage, totalPage} = getProperPagination(page_, perPage_, totalCount);
            mysql.select("users", cond, {offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {})}).then(list => {
                resolve({
                    list,
                    page,
                    perPage,
                    totalPage
                })
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}