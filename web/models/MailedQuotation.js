const mysql = require('./mysqlConnect');
const { getProperPagination, getCurrentFormatedDate } = require('../utils');

const userCombinedQuery = 'select m.*, u.name as createdBy from mailed_quotation as m left join users as u on m.user_id = u.id';

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let { id, to_name, subject, mail_content, to_email, invoice_id, user_id } = data;
        let quotation = {
            to_name, subject, mail_content, to_email, user_id,
            status_id: 1,
            updated_at: getCurrentFormatedDate()
        };
        if (invoice_id !== undefined && invoice_id != '') quotation.invoice_id = invoice_id;
        if (isNew) {
            quotation.created_at = getCurrentFormatedDate();
            quotation.view_count = 0;
        }
        (isNew ? mysql.insertOne("mailed_quotation", quotation) : mysql.updateOne("mailed_quotation", { id }, quotation)).then(quotation => {
            resolve(quotation);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.updateOne = (id, quotation) => {
    return new Promise((resolve, reject) => {
        mysql.updateOne("mailed_quotation", { id }, { ...quotation, updated_at: getCurrentFormatedDate() }).then(quotation => {
            resolve(quotation);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.list = (filter) => {
    return new Promise((resolve, reject) => {
        mysql.select(`${userCombinedQuery} where m.deleted_at is null`).then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        });
    })
}

exports.listWithPagination = (cond, page_ = 1, perPage_ = 10) => {
    return new Promise((resolve, reject) => {
        mysql.select("mailed_quotation", { deleted_at: null }, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.query(`${userCombinedQuery} where m.deleted_at is null order by m.id desc limit ${perPage} offset ${(page - 1) * perPage}`).then(list => {
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
        mysql.query(`${userCombinedQuery} where m.id='${id}' and m.deleted_at is null`).then(([mailed_quotation]) => {
            resolve(mailed_quotation);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        mysql.updateOne("mailed_quotation", { id }, {
            updated_at: getCurrentFormatedDate(),
            deleted_at: getCurrentFormatedDate()
        }).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}