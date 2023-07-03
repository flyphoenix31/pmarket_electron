const moment = require('moment');
const mysql = require('./mysqlConnect');
const { getProperPagination } = require('../utils');

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let currentDateStr = moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
        let { id, tag, title, is_featured, sub_title, content, slug_url } = data;
        let portfolio = {
            tag, title, is_featured, sub_title, content, slug_url,
            status_id: 1,
            // created_at: currentDateStr,
            updated_at: currentDateStr
        };
        if (isNew) {
            portfolio.created_at = currentDateStr;
        }
        (isNew ? mysql.insertOne("portfolio", portfolio) : mysql.updateOne("portfolio", { id }, portfolio)).then(portfolio => {
            resolve(portfolio);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.list = (filter) => {
    return new Promise((resolve, reject) => {
        mysql.select("portfolio").then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.listWithPagination = (cond, page_ = 1, perPage_ = 10) => {
    return new Promise((resolve, reject) => {
        mysql.select("portfolio", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("portfolio", null, { offset: (page - 1) * perPage, limit: perPage, orderBy: { id: 'desc' } }).then(list => {
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
    return new Promise((resolve, reject) => [
        mysql.select("portfolio", { id }).then(portfolio => {
            resolve(portfolio);
        }).catch(err => {
            reject(err);
        })
    ])
}