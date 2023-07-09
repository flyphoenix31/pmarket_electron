const Invoice = require('../models/Invoice');
const MailedQuotation = require('../models/MailedQuotation');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const mysql = require('../models/mysqlConnect');
const MailedQuotationController = require('./mailedQuotation');
const config = require('../../config');
const { sendMail } = require('../utils');

const itemValidate = (invoice_item) => {
    const { description, item_notes, unit_price, quantity, has_tax } = invoice_item;
    const errors = {};
    if (isEmpty(description)) errors.description = "Description is required";
    // if (isEmpty(item_notes)) errors.item_notes = "Additional details is required";
    if (isEmpty(item_notes)) invoice_item.item_notes = "";
    if (Number.isNaN(Number(unit_price)) || Number(unit_price) <= 0) {
        errors.unit_price = "Price is required";
    }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
        errors.quantity = "Quantity is required";
    }
    if (!Number.isInteger(Number(has_tax)) || (Number(has_tax) != 0 && Number(has_tax) != 1)) {
        errors.has_tax = "Tax field is required";
    }
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

const validate = (invoice, newInvoice = true) => {
    const { name, invoice_number, invoice_date, due_date, notes, company_name, company_email, company_phone, company_address, client_name, client_email, client_phone, client_address, currency_id, items, tax_type_id, tax_value, discount_type_id, discount_value } = invoice;
    const errors = {};
    if (isEmpty(name)) errors.name = "Name field is required";
    // if (isEmpty(invoice_number)) errors.invoice_number = "Invoice number required";
    // else if (!validator.isNumeric(invoice_number)) errors.invoice_number = "Invoice number is invalid";
    if (isEmpty(invoice_date)) errors.invoice_date = "Invoice date is required";
    else if (!validator.isDate(invoice_date, { format: "yyyy-MM-DD" })) errors.invoice_date = "Invoice date is invalid"
    if (isEmpty(due_date)) errors.due_date = "Due date is required";
    else if (!validator.isDate(due_date, { format: "yyyy-MM-DD" })) errors.due_date = "Due date is invalid"
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

    if (tax_type_id == 1 || tax_type_id == 2) {
        if (Number.isNaN(Number(tax_value)) || Number(tax_value > 100) || Number(tax_value <= 0)) {
            errors.tax_value = "Tax value is invalid";
        }
    } else if (Number(tax_type_id)) {
        errors.tax_type_id = "Tax type is invalid";
    }
    if (discount_type_id == 1 || discount_type_id == 2) {
        if (Number.isNaN(Number(discount_value)) || Number(discount_value) <= 0) {
            errors.discount_value = "Discount value is invalid";
        }
    } else if (Number(discount_type_id)) {
        errors.discount_type_id = "Discount Type is invalid";
    }

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
    Invoice.store({ ...req.body, user_id: req.user.id }).then(({ invoice, items, bank_detail }) => {
        return res.json({
            status: 0,
            invoice,
            items,
            bank_detail
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
    Invoice.store({ ...req.body, user_id: req.user.id }, false).then(({ invoice, items }) => {
        if (!invoice) {
            mysql.deleteMany("invoice_items", { invoice_id: req.body.id });
            return res.json({
                status: 1,
                message: "Invoice not found"
            });
        }
        return res.json({
            status: 0,
            invoice,
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
    Invoice.listWithPagination(null, req.query.page, req.query.perPage).then(({ list, page, perPage, totalPage }) => {
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
    Invoice.findOne(req.query.id).then(({ invoice, items }) => {
        if (!invoice) {
            return res.json({
                status: 1,
                message: "Invoice not found"
            })
        }
        return res.json({
            status: 0,
            invoice,
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

exports.statusList = (req, res) => {
    mysql.select("invoice_statuses", null).then(list => {
        return res.json({
            status: 0,
            list
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
    req.body.user_id = req.user.id;
    if (req.body.invoice === undefined)
        req.body.invoice = "-1";
    mysql.updateOne("invoice_master", { invoice_number: req.body.invoice }, { status_id: Invoice.STATUS.MAILED }).then((invoice) => {
        if (!invoice)
            return res.json({
                status: 1,
                message: 'Invoice not found'
            });

        req.body.invoice_id = invoice.id;
        MailedQuotation.store(req.body).then((mailedQuotation) => {
            let url = `${config.serverUrl}/member/quote/view/${mailedQuotation.public_link}`;
            sendMail({
                to: mailedQuotation.to_email,
                subject: mailedQuotation.subject,
                html: mailedQuotation.mail_content.replace('{CLIENT_NAME}', invoice.client_name).replace('{QUOTE_LINK}', `<a href="${url}" class='btn btn-primary'>Quote Link</a>`), // html body
            }).then(success => {
                if (success)
                    return res.json({
                        status: 0,
                        invoice,
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
            message: "Please try again later."
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
    Invoice.customerView(req.query.uuid).then(({ invoice, items }) => {
        if (!invoice) {
            return res.json({
                status: 1,
                message: "Quotation not found"
            })
        }
        return res.json({
            status: 0,
            invoice,
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

exports.newPossibleInvoiceNumber = (req, res) => {
    mysql.query("select max(invoice_number) as max_invoice_number from invoice_master").then(([invoice]) => {
        let invoiceNumber = 1000;
        if (invoice) {
            console.log(invoice);
            invoiceNumber = Number(invoice.max_invoice_number) + 1;
        }
        return res.json({
            status: 0,
            invoiceNumber
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}