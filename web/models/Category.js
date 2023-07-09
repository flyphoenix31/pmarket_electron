const { getProperPagination, getCurrentFormatedDate } = require('../utils');
const mysql = require('./mysqlConnect')
exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let { id, name } = data;
        const category = {
            name
        };
        (isNew ? mysql.insertOne("category_list", category) : mysql.updateOne("category_list", { id }, category)).then(category => {
            resolve(category);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        mysql.select("category_list", null, { orderBy: { id: "desc" } }).then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = ({ cond, page: page_, perPage: perPage_, extra }) => {
    return new Promise((resolve, reject) => {
        mysql.select("category_list", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("category_list", null, { offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {}) }).then(list => {
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
        mysql.select("category_list", { id }).then(([category]) => {
            resolve(category);
        }).catch(err => {
            reject(err);
        })
    })
}