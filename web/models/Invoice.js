const mysql = require('./mysqlConnect');
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