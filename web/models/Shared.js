const mysql = require('./mysqlConnect')
const { getProperPagination, getCurrentFormatedDate } = require('../utils');
exports.makeRead = (from_user, to_user) => {
    return new Promise((resolve, reject) => {
        mysql.update('messages', { from_user, to_user, is_read: 0 }, { is_read: 1, updated_at: getCurrentFormatedDate() }).then(() => {
            resolve();
        }).catch(err => {
            return reject(err);
        })
    })
}

exports.getWithUser = (user1, user2) => {
    return new Promise((resolve, reject) => {
        mysql.select("messages", { or: [{ from_user: user1, to_user: user2 }, { from_user: user2, to_user: user1 }] }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.fileUpload = (data) => {
    return new Promise((resolve, reject) => {
        mysql.insertOne("shared", data).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
}
exports.makeFolder = ( data ) => {
    return new Promise((resolve, reject) => {
        mysql.insertOne("shared", data).then((result) => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
}

exports.listWithPagination = (cond, page_, perPage_, extra) => {
    return new Promise((resolve, reject) => {
        mysql.select("shared", cond, { isGetCount: true }).then(totalCount => {
            let {page, perPage, totalPage} = getProperPagination(page_, perPage_, totalCount);
            mysql.select("shared", cond, {offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {})}).then(list => {
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

exports.histlistWithPagination = (cond, page_, perPage_, extra) => {
    return new Promise((resolve, reject) => {
        mysql.select("sharedhistory", cond, { isGetCount: true }).then(totalCount => {
            let {page, perPage, totalPage} = getProperPagination(page_, perPage_, totalCount);
            mysql.select("sharedhistory", cond, {offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {})}).then(list => {
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

exports.hupdate = (cond, updatedUser) => {
    return new Promise((resolve, reject) => {
        mysql.update('sharedhistory', cond, updatedUser).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}