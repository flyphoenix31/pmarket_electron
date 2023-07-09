const validator = require('validator');
const fs = require('fs');
const path = require('path')
const Setting = require('../models/Setting');
const isEmpty = require('../utils/isEmpty');
exports.get = (req, res) => {
    Setting.get().then(setting => {
        if (!setting) {
            return res.json({
                status: 1,
                message: "No setting found"
            })
        }
        return res.json({
            status: 0,
            setting
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

const validate = (data) => {
    const { account_number, bank_name, bank_code, bank_country, business_name, company_mail, company_phone, company_address } = data;
    const errors = {};
    if (isEmpty(account_number)) errors.account_number = "Account number is required";
    if (isEmpty(bank_name)) errors.bank_name = "Bank name is required";
    if (isEmpty(bank_code)) errors.bank_code = "Bank code is required";
    if (isEmpty(bank_country)) errors.bank_country = "Bank country is required";
    if (isEmpty(business_name)) errors.business_name = "Business name is required";
    if (isEmpty(company_mail)) errors.company_mail = "Company mail is required";
    else if (!validator.isEmail(company_mail)) errors.company_mail = "Company mail is invalid";
    if (isEmpty(company_phone)) errors.company_phone = "Company phone is required";
    else if (!validator.isMobilePhone(company_phone)) errors.company_phone = "Company phone is invalid";
    if (isEmpty(company_address)) errors.company_address = "Company address is required";

    return {
        isValid: !(Object.keys(errors).length),
        errors
    }
}

exports.set = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    let fileName = null;
    let uploadPath = null;
    const setSetting = () => {
        if (uploadPath) {
            req.body.site_logo = filePath;
        }
        Setting.set(req.body).then(setting => {
            res.json({
                status: 0,
                setting
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        })
    }
    if (req.files && Object.keys(req.files).length) {
        const file = req.files.logo;
        let timestamp = new Date().getTime();
        fileName = file.name;
        uploadPath = path.join(__dirname, `..\\client\\uploads\\logo\\${timestamp}`);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        uploadPath = path.join(__dirname, `..\\client\\uploads\\logo\\${timestamp}\\${file.name}`);
        filePath = `\\\\uploads\\\\logo\\\\${timestamp}\\\\${file.name}`;
        file.mv(uploadPath, function (err) {
            if (err) {
                return res.json({
                    status: 1,
                    message: 'Please try again later'
                })
            }
            setSetting();
        })
    } else {
        setSetting();
    }
}