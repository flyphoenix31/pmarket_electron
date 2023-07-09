const MailedQuotation = require('../models/MailedQuotation');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const Invoice = require('../models/Invoice');
const Quotation = require('../models/Quotation');
const Notification = require('../models/Notification');
const mysql = require('../models/mysqlConnect');
const ioHandler = require('../ioHandler');

const validate = (mailedQuotation, isNew = true) => {
    const { to_name, subject, mail_content, to_email } = mailedQuotation;
    const errors = {};
    if (isEmpty(to_name)) errors.to_name = "To name is required";
    if (isEmpty(subject)) errors.subject = "Subject field is required";
    if (isEmpty(mail_content)) errors.mail_content = "Mail content is required";
    if (isEmpty(to_email)) errors.to_email = "To email is required";
    else if (!validator.isEmail(to_email)) errors.to_email = "To email is invalid";

    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.validate = validate;

exports.viewQuotation = (req, res) => {
    const { uuid } = req.query;
    mysql.query(`select * from mailed_quotation where mailed_quotation.public_link='${uuid}'; update mailed_quotation set view_count = view_count + 1;`).then(([[mailedQuotation]]) => {
        if (!mailedQuotation) {
            return res.json({
                status: 1,
                message: "Mailed Quotation not found"
            })
        }
        Notification.generateMailedQuotationViewedNotification(mailedQuotation);
        if (mailedQuotation.invoice_id !== null) {
            Invoice.customerView(mailedQuotation.invoice_id).then(({invoice, items}) => {
                return res.json({
                    status: 0,
                    invoice, items
                })
            }).catch(err => {
                console.log(err);
                return res.json({
                    status: 1,
                    message: "Please try again later"
                })
            })
        } else {
            Quotation.customerView(mailedQuotation.quotation_id).then(({quotation, items}) => {
                return res.json({
                    status: 0,
                    quotation, items
                })
            }).catch(err => {
                console.log(err);
                return res.json({
                    status: 1,
                    message: "Please try again later"
                })
            })
        }
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}