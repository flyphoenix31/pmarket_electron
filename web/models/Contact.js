const { getProperPagination, getCurrentFormatedDate } = require('../utils');
const mysql = require('./mysqlConnect')
const STATUS = {
    ACTIVE: 1,
    INACTIVE: 2
}
exports.STATUS = STATUS;

const TITLE = {
    Mr: 0,
    Ms: 1,
    Mrs: 2,
    Dr: 3
}
exports.TITLE = TITLE;

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let { id, title, name, email, phone, address, website, remark, status_id } = data;
        const client = {
            title, name, email, address, status_id,
            updated_at: getCurrentFormatedDate(),
        }
        if (isNew)
            client.created_at = getCurrentFormatedDate()
        if (phone)
            client.phone = phone;
        if (website)
            client.website = website;
        if (remark)
            client.remark = remark;
        (isNew ? mysql.insertOne("contacts", client) : mysql.updateOne("contacts", { id }, client)).then(client => {
            resolve(client);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        mysql.select("contacts", { deleted_at: null }, { orderBy: { id: "desc" } }).then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = ({ cond, page: page_, perPage: perPage_, extra }) => {
    return new Promise((resolve, reject) => {
        mysql.select("contacts", { deleted_at: null }, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("contacts", { deleted_at: null }, { offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {}) }).then(list => {
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

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        mysql.select("contacts", { id, deleted_at: null }).then(([client]) => {
            resolve(client);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        mysql.updateOne("contacts", { id }, {
            updated_at: getCurrentFormatedDate(),
            deleted_at: getCurrentFormatedDate()
        }).then(client => {
            resolve(client);
        }).catch(err => {
            reject(err);
        })
    })
}