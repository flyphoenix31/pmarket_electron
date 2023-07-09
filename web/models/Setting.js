const mysql = require('../models/mysqlConnect');
const { getCurrentFormatedDate } = require('../utils');

exports.get = () => {
    return new Promise((resolve, reject) => {
        mysql.select("settings", null, { limit: 1 }).then(([setting]) => {
            resolve(setting);
        }).catch(err => {
            reject(err);
        })
    });
}

exports.set = (data) => {
    return new Promise((resolve, reject) => {
        let { account_number, bank_name, bank_code, bank_country, business_name, company_mail, company_phone, company_address, site_logo } = data;
        const newSetting = { account_number, bank_name, bank_code, bank_country, business_name, company_mail, company_phone, company_address, updated_at: getCurrentFormatedDate() };
        if (site_logo)
            newSetting.site_logo = site_logo;
        mysql.select("settings", null).then(([setting]) => {
            (setting ?
                (newSetting.created_at = getCurrentFormatedDate(),
                    mysql.updateOne("settings", { id: setting.id }, newSetting)) :
                mysql.insertOne("settings", newSetting)
            ).then(setting => {
                resolve(setting)
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}