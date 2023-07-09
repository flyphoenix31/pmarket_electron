const { getCurrentFormatedDate, getProperPagination } = require('../utils');
const mysql = require('./mysqlConnect')

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        const { id, name } = data;
        const permission = {
            name,
            updated_at: getCurrentFormatedDate(),
            guard_name: "web"
        }
        if (isNew) permission.created_at = getCurrentFormatedDate();
        (isNew ? mysql.insertOne("permissions", permission) : mysql.updateOne("permissions", { id }, permission)).then(permission => {
            resolve(permission);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        mysql.select("permissions", {id}).then(([permission]) => {
            resolve(permission);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        mysql.select("permissions").then(permissions => {
            resolve(permissions)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.listWithPagination = ({
    cond,
    page: page_,
    perPage: perPage_
}) => {
    return new Promise((resolve, reject) => {
        mysql.select("permissions", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("permissions", null, { offset: (page - 1) * perPage, limit: perPage, orderBy: { id: 'desc' } }).then(list => {
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