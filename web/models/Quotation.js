const Setting = require('./Setting');
const mysql = require('./mysqlConnect');
const { getProperPagination, getCurrentFormatedDate } = require('../utils');

const STATUS = {
    DRAFT: 1,
    MAILED: 2,
    VIEWED: 3
}
exports.STATUS = STATUS;

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let { id, name, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, items, tax_type_id, tax_value, discount_type_id, discount_value, user_id } = data;
        let quotation = {
            name, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, user_id,
            updated_at: getCurrentFormatedDate()
        };
        if (isNew) {
            quotation.status_id = STATUS.DRAFT;
            quotation.created_at = getCurrentFormatedDate();
        }

        let grand_total = 0

        let newItems = [];
        items.forEach(item => {
            const newItem = {
                description: item.description,
                item_notes: item.item_notes,
                unit_price: Number(item.unit_price),
                quantity: Number(item.quantity),
                sub_total: Number(item.unit_price) * Number(item.quantity),
                created_at: getCurrentFormatedDate(),
                updated_at: getCurrentFormatedDate()
            };
            newItems.push(newItem);
            grand_total += newItem.sub_total;
        });

        quotation.grand_total = grand_total;

        if (!isNew) {
            newItems.forEach(item => {
                item.quotation_id = id
            });
            let sql = `
                ${mysql.updateQuery("quotation", { id }, quotation)}
                ${mysql.selectQuery("quotation", { id })}
                ${mysql.deleteManyQuery("quotation_items", { quotation_id: id })}
                ${mysql.insertManyQuery("quotation_items", newItems)}
                ${mysql.selectQuery("quotation_items", { quotation_id: id })}
            `;

            mysql.query(sql).then(([quotationUpdateResult, [quotation], deleteItemsResult, insertItemsResult, items]) => {
                resolve({
                    quotation,
                    items
                })
            }).catch(err => {
                reject(err);
            })
        }
        else {
            Setting.get().then(bank => {
                quotation.account_number = bank.account_number;
                quotation.bank_name = bank.bank_name;
                quotation.bank_code = bank.bank_code;
                quotation.bank_country = bank.bank_country;
                mysql.insertOne("quotation", quotation).then(quotation => {
                    newItems.forEach(item => {
                        item.quotation_id = quotation.id
                    });
                    mysql.insertMany("quotation_items", newItems).then((insertManyResult) => {
                        mysql.select("quotation_items", { quotation_id: quotation.id }).then(items => {
                            resolve({
                                quotation,
                                items
                            })
                        }).catch(err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        }
    })
}

exports.list = (filter) => {
    return new Promise((resolve, reject) => {
        mysql.query(
            `select i.*,
                u.name as user_name,
                u.email as user_email,
                u.status_id as user_status_id,
                u.username as user_username,
                u.phone as user_phone,
                u.work_status as user_work_status
            from quotation as i 
            left join users as u on u.id = i.user_id`
        ).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.update = (cond, updateQuotation) => {
    return new Promise((resolve, reject) => {
    mysql.update('quotation', cond, updateQuotation).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = (cond, page_, perPage_) => {
    return new Promise((resolve, reject) => {
        mysql.select("quotation", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.query(
                `select i.*,
                    u.name as user_name,
                    u.email as user_email,
                    u.status_id as user_status_id,
                    u.username as user_username,
                    u.phone as user_phone,
                    u.work_status as user_work_status
                from quotation as i 
                left join users as u on u.id = i.user_id where i.deleted_at is null order by i.id desc limit ${perPage} offset ${perPage * (page - 1)};`
            ).then(list => {
                resolve({
                    list,
                    page,
                    perPage,
                    totalPage
                });
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        })
    })
}

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        const quotationSql =
            `select quotation.* ,
        c.name as c_name,
        c.code as c_code,
        c.symbol as c_symbol,
        c.country_name as c_country_name
        from quotation 
        left join country_currency as c on quotation.currency_id=c.id
        where quotation.id = '${id}';`
        const itemsSql = `select * from quotation_items where quotation_id=${id};`;
        mysql.query(`${quotationSql}${itemsSql}`).then(([[quotation], items]) => {
            resolve({
                quotation, items
            });
        }).catch(err => {
            reject(err);
        })
    });
}

exports.customerView = (id) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `update quotation set status_id='${STATUS.VIEWED}' where id='${id}';`
        const selectQuery =
            `select quotation.* ,
                c.name as c_name,
                c.code as c_code,
                c.symbol as c_symbol,
                c.country_name as c_country_name
                from quotation 
                left join country_currency as c on quotation.currency_id=c.id
                where quotation.id = '${id}';`
        const itemsSql = `select * from quotation_items where quotation_id='${id}';`;
        mysql.query(`${updateQuery} ${selectQuery} ${itemsSql}`).then(([updateResult, [quotation], items]) => {
            resolve({
                quotation, items
            })
        }).catch(err => {
            reject(err);
        })
    })
}