const { getCurrentFormatedDate } = require('../utils');
const mysql = require('./mysqlConnect');

const IS_CONVERTED = {
    YES: 1,
    NO: null
}
exports.IS_CONVERTED = IS_CONVERTED;
const IS_REPLIED = {
    YES: 1,
    NO: null
}
exports.IS_REPLIED = IS_REPLIED;

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        const { id, name, email, subject, message } = data;
        const enquiry = {
            name, email, subject, message, updated_at: getCurrentFormatedDate(),
        };
        if (isNew) enquiry.created_at = getCurrentFormatedDate();
        (isNew?mysql.insertOne("enquiries", enquiry):mysql.updateOne("enquiries", {id}, enquiry)).then(enquiry => {
            resolve(enquiry);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = ({ cond, page: page_, perPage: perPage_, extra }) => {
    return new Promise((resolve, reject) => {
        mysql.select("enquiries", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("enquiries", null, { offset: (page - 1) * perPage, limit: perPage, ...(extra ?? {}) }).then(list => {
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
        mysql.select("enquiries", {id}).then(([enquiry]) => {
            resolve(enquiry);
        }).catch(err => {
            reject(err);
        })
    })
}