const MailedQuotation = require('../models/MailedQuotation');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const mysql = require('../models/mysqlConnect');

const validate = (quotation, newQuotation = true) => {
    const { to_name, subject, mail_content, to_email } = quotation;
    const errors = {};
    if (isEmpty(to_name)) errors.subject = "Subject field is required";
    if (isEmpty(subject)) errors.subject = "Subject field is required";
    if (isEmpty(mail_content)) errors.mail_content = "Mail content is required";
    if (isEmpty(to_email)) errors.to_email = "To email is required";
    else if (!validator.isEmail(to_email)) errors.to_email = "To email is invalid";

    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.new = (req, res) => {
    let { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    if (req.body.invoice === undefined)
        req.body.invoice = "-1";
    mysql.select("invoice_master", { invoice_number: req.body.invoice }).then(([invoice]) => {
        if (invoice) {
            req.body.invoice_id = invoice.id
        } else {
            req.body.invoice_id = undefined;
        }
        MailedQuotation.store({ ...req.body, user_id: req.user.id }, true).then(quotation => {
            res.json({
                status: 0,
                quotation
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

exports.update = (req, res) => {
    let { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    if (req.body.id === undefined) {
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    }
    if (req.body.invoice === undefined)
        req.body.invoice = "-1";
    mysql.select("invoice_master", { invoice_number: req.body.invoice }).then(([invoice]) => {
        if (invoice) {
            req.body.invoice_id = invoice.id
        } else {
            req.body.invoice_id = undefined;
        }
        MailedQuotation.store({ ...req.body, user_id: req.user.id }, false).then(quotation => {
            res.json({
                status: 0,
                quotation
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

exports.updateStatus = (req, res) => {
    const { id, status_id } = req.body;
    if (id === undefined) {
        return res.json({
            status: 1,
            message: "Quotation not found"
        })
    }
    if (status_id != 1 && status_id != 2) {
        return res.json({
            status: 1,
            message: "Invalid Status"
        })
    }
    MailedQuotation.updateOne(id, { status_id: status_id }).then(quotation => {
        return res.json({
            status: 0,
            quotation
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.list = (req, res) => {
    MailedQuotation.listWithPagination(null, req.query.page, req.query.perPage).then(({ list, page, perPage, totalPage }) => {
        res.json({
            status: 0,
            list,
            page,
            perPage,
            totalPage
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.findOne = (req, res) => {
    if (req.query.id === undefined) {
        return res.json({
            status: 1,
            message: 'Quotation not found'
        })
    }
    MailedQuotation.findOne(req.query.id).then(([quotation]) => {
        if (!quotation) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        return res.json({
            status: 0,
            quotation
        })
    }).catch(err => {
        console.log("error:", err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.delete = (req, res) => {
    if (req.body.id === undefined) {
        return res.json({
            status: 1,
            message: 'Quotation not found'
        })
    }
    MailedQuotation.delete(req.body.id).then(() => {
        return res.json({
            status: 0,
            message: 'Quotation deleted'
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}