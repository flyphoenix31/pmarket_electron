const moment = require('moment');
const mysql = require('./mysqlConnect');
const { getProperPagination } = require('../utils');

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let currentDateStr = moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
        let { id, subject, mail_content, to_email, invoice_id, user_id } = data;
        let quotation = {
            subject, mail_content, to_email, user_id,
            status_id: 1,
            // created_at: currentDateStr,
            updated_at: currentDateStr
        };
        if (invoice_id !== undefined) quotation.invoice_id = invoice_id;
        if (isNew) {
            quotation.created_at = currentDateStr;
            quotation.view_count = 0;
        }
        (isNew ? mysql.insertOne("mailed_quotation", quotation) : mysql.updateOne("mailed_quotation", { id }, quotation)).then(portfolio => {
            resolve(portfolio);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.updateOne = (id, quotation) => {
    return new Promise((resolve, reject) => {
        let currentDateStr = moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
        mysql.updateOne("mailed_quotation", {id}, {...quotation, updated_at: currentDateStr}).then(quotation => {
            resolve(quotation);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.list = (filter) => {
    return new Promise((resolve, reject) => {
        mysql.select("mailed_quotation").then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.listWithPagination = (cond, page_ = 1, perPage_ = 10) => {
    return new Promise((resolve, reject) => {
        mysql.select("mailed_quotation", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("mailed_quotation", null, { offset: (page - 1) * perPage, limit: perPage, orderBy: { id: 'desc' } }).then(list => {
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
        mysql.select("mailed_quotation", { id }).then(mailed_quotation => {
            resolve(mailed_quotation);
        }).catch(err => {
            reject(err);
        })
    ])
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        mysql.deleteMany("mailed_quotation", { id }).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}