const { getProperPagination } = require('../utils');
const mysql = require('./mysqlConnect');

const STATUS = {
    ACTIVE: 1,
    INACTIVE: 2,
    CLOSED: 3
}
exports.STATUS = STATUS;

const TYPE = {
    BY_ROLE: 1,
    BY_USERS: 2
}
exports.TYPE = TYPE;


exports.listWithPagination = (cond, page_, perPage_, extra) => {
    return new Promise((resolve, reject) => {
        mysql.select("messages", cond, { isGetCount: true }).then(totalCount => {
            let {page, perPage, totalPage} = getProperPagination(page_, perPage_, totalCount);
            mysql.select("messages", cond, {offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {})}).then(list => {
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

exports.update = (cond, updatedUser) => {
    return new Promise((resolve, reject) => {
        mysql.update('messages', cond, updatedUser).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}
