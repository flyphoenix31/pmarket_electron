const Quotation = require('../models/Quotation');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const mysql = require('../models/mysqlConnect');

const MailedQuotation = require('../models/MailedQuotation');
const MailedQuotationController = require('./mailedQuotation');
const { sendMail } = require('../utils');
const config = require('../../config');

const itemValidate = (quotation_item) => {
    const { description, item_notes, unit_price, quantity } = quotation_item;
    const errors = {};
    if (isEmpty(description)) errors.description = "Description is required";
    // if (isEmpty(item_notes)) errors.item_notes = "Additional details is required";
    if (isEmpty(item_notes)) quotation_item.item_notes = "";
    if (Number.isNaN(Number(unit_price)) || Number(unit_price) <= 0) {
        errors.unit_price = "Price is required";
    }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
        errors.quantity = "Quantity is required";
    }
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

const validate = (quotation, isNew = true) => {
    const { name, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, items } = quotation;
    const errors = {};
    if (isEmpty(name)) errors.name = "Name field is required";
    if (isEmpty(notes)) errors.notes = "Notes field is required";
    if (isEmpty(company_name)) errors.company_name = "Company name is required";
    if (isEmpty(company_email)) errors.company_email = "Company email is required";
    else if (!validator.isEmail(company_email)) errors.company_email = "Company email is invalid";
    if (isEmpty(company_phone)) errors.company_phone = "Company phone is required";
    else if (!validator.isMobilePhone(company_phone)) errors.company_phone = "Company phone is required";
    if (isEmpty(company_address)) errors.company_address = "Company address is required";
    if (isEmpty(client_name)) errors.client_name = "Client name is required";
    if (isEmpty(client_email)) errors.client_email = "Client email is required";
    else if (!validator.isEmail(client_email)) errors.client_email = "Client email is invalid";
    if (isEmpty(client_phone)) errors.client_phone = "Client phone is required";
    else if (!validator.isMobilePhone(client_phone)) errors.client_phone = "Client phone is invalid";
    if (isEmpty(client_address)) errors.client_address = "Client address is required";
    if (currency_id === undefined) errors.currency_id = "Currency type is required";

    let itemsValid = true;
    let itemErrors = [];

    if (isEmpty(items) || !Array.isArray(items)) errors.items = "Items required";
    else {
        items.forEach(item => {
            let { isValid, errors } = itemValidate(item);
            if (isValid) {
                itemErrors.push(null);
            } else {
                itemsValid = false;
                itemErrors.push(errors);
            }
        });
    }

    if (!itemsValid) {
        errors.itemErrors = itemErrors
    }

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
    Quotation.store({ ...req.body, user_id: req.user.id }).then(({ quotation, items }) => {
        return res.json({
            status: 0,
            quotation,
            items
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
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
    if (!req.body.id) {
        return res.json({
            status: 1,
            message: "Quotation not found"
        })
    }
    Quotation.store({ ...req.body, user_id: req.user.id }, false).then(({ quotation, items }) => {
        if (!quotation) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        return res.json({
            status: 0,
            quotation,
            items
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.sendQuotation = async (req, res) => {
    const { isValid, errors } = MailedQuotationController.validate(req.body);
    if (!isValid)
        return res.json({
            status: 1,
            errors
        })
    if (!req.body.quotation_id) {
        return res.json({
            status: 1,
            message: "Quotation not found"
        })
    }
    req.body.user_id = req.user.id;
    mysql.updateOne("quotation", { id: req.body.quotation_id }, { status_id: Quotation.STATUS.MAILED }).then((quotation) => {
        if (!quotation) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        req.body.quotation_id = quotation.id;
        MailedQuotation.store(req.body).then((mailedQuotation) => {
            let url = `${config.serverUrl}/member/quote/view/${mailedQuotation.public_link}`;
            sendMail({
                to: mailedQuotation.to_email,
                subject: mailedQuotation.subject,
                html: mailedQuotation.mail_content.replace('{CLIENT_NAME}', quotation.client_name).replace('{QUOTE_LINK}', `<a href="${url}" class='btn btn-primary'>Quote Link</a>`), // html body
            }).then(success => {
                if (success)
                    return res.json({
                        status: 0,
                        quotation,
                        message: "Email sent successfuly"
                    })
                return res.json({
                    status: 1,
                    message: "No mail account set"
                })
            }).catch(err => {
                console.log(err);
                return res.json({
                    status: 1,
                    message: "Please try again later."
                })
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: "Please try again later."
            })
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.customerView = (req, res) => {
    if (!req.query.uuid) {
        return res.json({
            status: 1,
            message: "Quotation not found"
        })
    }
    Quotation.customerView(req.query.uuid).then(({ quotation, items }) => {
        if (!quotation) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        return res.json({
            status: 0,
            quotation,
            items
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.list = (req, res) => {
    Quotation.listWithPagination(null, req.query.page, req.query.perPage).then(({ list, page, perPage, totalPage }) => {
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
    if (!req.query.id) {
        return res.json({
            status: 1,
            message: "Quotation not found"
        })
    }
    Quotation.findOne(req.query.id).then(({ quotation, items }) => {
        if (!quotation) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        return res.json({
            status: 0,
            quotation,
            items
        })
    }).catch(err => {
        console.log("error:", err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}