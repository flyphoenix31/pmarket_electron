const Setting = require('./Setting');
const mysql = require('./mysqlConnect');
const { getProperPagination, getCurrentFormatedDate } = require('../utils');

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        let { id, name, invoice_number, invoice_date, due_date, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, items, tax_type_id, tax_value, discount_type_id, discount_value, user_id } = data;
        let invoice = {
            name, invoice_number, invoice_date, due_date, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, user_id,
            status_id: 1,
            updated_at: getCurrentFormatedDate()
        };
        if (isNew) {
            invoice.created_at = getCurrentFormatedDate();
        }
        if (tax_type_id !== undefined && tax_type_id !== null) {
            invoice.tax_type_id = tax_type_id;
            invoice.tax_value = tax_value;
        }
        if (discount_type_id !== undefined && discount_type_id !== null) {
            invoice.discount_type_id = discount_type_id;
            invoice.discount_value = discount_value;
        }

        let sub_total = 0,
            grand_total = 0,
            total_tax = 0,
            total_discount = 0;

        let newItems = [];
        items.forEach(item => {
            const newItem = {
                description: item.description,
                item_notes: item.item_notes,
                unit_price: Number(item.unit_price),
                quantity: Number(item.quantity),
                sub_total: Number(item.unit_price) * Number(item.quantity),
                has_tax: Number(item.has_tax),
                created_at: getCurrentFormatedDate(),
                updated_at: getCurrentFormatedDate()
            };
            newItems.push(newItem);
            sub_total += newItem.sub_total;
            if (invoice.tax_type_id !== undefined && invoice.tax_type_id !== null) {
                if (newItem.has_tax || invoice.tax_type_id == 2) {
                    total_tax += newItem.sub_total * invoice.tax_value / 100;
                }
            }
        });

        if (discount_type_id !== undefined && discount_type_id !== null) {
            if (discount_type_id == 2)
                total_discount = sub_total * invoice.discount_value / 100;
            else
                total_discount = invoice.discount_value
        }
        grand_total = sub_total + total_tax - total_discount;

        invoice.sub_total = sub_total;
        invoice.grand_total = grand_total;
        invoice.total_tax = total_tax;
        invoice.total_discount = total_discount;

        if (!isNew) {
            newItems.forEach(item => {
                item.invoice_id = id
            });
            let sql = `
                ${mysql.updateQuery("invoice_master", { id }, invoice)}
                ${mysql.selectQuery("invoice_master", { id })}
                ${mysql.deleteManyQuery("invoice_items", { invoice_id: id })}
                ${mysql.insertManyQuery("invoice_items", newItems)}
                ${mysql.selectQuery("invoice_items", { invoice_id: id })}
            `;

            mysql.query(sql).then(([invoiceUpdateResult, [invoice], deleteItemsResult, insertItemsResult, items]) => {
                resolve({
                    invoice,
                    items
                })
            }).catch(err => {
                reject(err);
            })
        }
        else {
            Promise.all([
                mysql.insertOne("invoice_master", invoice),
                Setting.getBank()
            ]).then(([invoice, bank]) => {
                newItems.forEach(item => {
                    item.invoice_id = invoice.id
                });
                Promise.all([
                    mysql.insertMany("invoice_items", newItems),
                    mysql.insertOne("invoice_bank_details", {
                        created_at: getCurrentFormatedDate(),
                        updated_at: getCurrentFormatedDate(),
                        invoice_id: invoice.id,
                        account_number: bank.account_number,
                        bank_name: bank.bank_name,
                        bank_code: bank.bank_code,
                        bank_country: bank.bank_country
                    })
                ]).then(([insertManyResult, bank_detail]) => {
                    mysql.select("invoice_items", { invoice_id: invoice.id }).then(items => {
                        resolve({
                            invoice,
                            items,
                            bank_detail
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
                u.work_status as user_work_status,
                s.name as status_name,
                s.display_name as status_display_name,
                s.color as status_color
            from invoice_master as i 
            left join users as u on u.id = i.user_id 
            left join invoice_statuses as s on s.id = i.status_id`
        ).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.listWithPagination = (cond, page_ = 1, perPage_ = 10) => {
    return new Promise((resolve, reject) => {
        mysql.select("invoice_master", null, { isGetCount: true }).then(totalCount => {
            let {page, perPage, totalPage} = getProperPagination(page_, perPage_, totalCount);
            mysql.query(
                `select i.*,
                    u.name as user_name,
                    u.email as user_email,
                    u.status_id as user_status_id,
                    u.username as user_username,
                    u.phone as user_phone,
                    u.work_status as user_work_status,
                    s.name as status_name,
                    s.display_name as status_display_name,
                    s.color as status_color
                from invoice_master as i 
                left join users as u on u.id = i.user_id 
                left join invoice_statuses as s on s.id = i.status_id order by i.id desc limit ${perPage} offset ${perPage * (page - 1)};`
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
        const invoiceSql =
            `select invoice_master.* ,
            b.account_number,
            b.bank_name,
            b.bank_code,
            b.bank_country,
        c.name as c_name,
        c.code as c_code,
        c.symbol as c_symbol,
        c.country_name as c_country_name
        from invoice_master 
        left join country_currency as c on invoice_master.currency_id=c.id
        left join invoice_bank_details as b on invoice_master.id=b.invoice_id
        where invoice_master.id = ${id};`
        const itemsSql = `select * from invoice_items where invoice_id=${id};`;
        mysql.query(`${invoiceSql}${itemsSql}`).then(([[invoice], items]) => {
            resolve({
                invoice, items
            });
        }).catch(err => {
            reject(err);
        })
    });
}