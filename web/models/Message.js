const mysql = require('./mysqlConnect')
const { getCurrentFormatedDate, getProperPagination } = require('../utils')
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

exports.getUnreadCounts = (to) => {
    return new Promise((resolve, reject) => {
        let totalUnreadCountSql = `select count(*) unreadCount from messages where to_user=${to} and is_read=0;`;
        let unreadsSql = `select count(id) unreadCount, from_user from messages where to_user = ${to} and is_read = 0 group by from_user;`;
        mysql.query(`${totalUnreadCountSql}${unreadsSql}`).then(([[{ unreadCount: total }], unreads]) => {
            resolve({
                total,
                unreads
            });
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    })
}

exports.sendMessage = (newMessage) => {
    return new Promise((resolve, reject) => {
        mysql.insertOne("messages", newMessage).then((newMessage) => {
            resolve(newMessage);
        }).catch(err => {
            reject(err);
        })
    });
}


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