const Contact = require('../models/Contact');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const mysql = require('../models/mysqlConnect');

const validate = (client, newClient = true) => {
    const { title, name, email, phone, address, website, remark, status_id } = client;
    const errors = {};
    if (Number.isNaN(Number(title)) || Number(title) < 0 || Number(title) > 3) errors.title = "Title field is invalid";
    if (isEmpty(name)) errors.name = "Name is required";
    if (isEmpty(email)) errors.email = "Email is required";
    if (!isEmpty(phone) && !validator.isMobilePhone(phone)) errors.phone = "Phone is invalid";
    if (!validator.isEmail(email)) errors.email = "Email is invalid";
    if (isEmpty(address)) errors.address = "Address is required";
    if (!status_id || status_id != Contact.STATUS.ACTIVE && status_id != Contact.STATUS.INACTIVE)
        errors.status_id = "Status is invalid";

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
    mysql.select("contacts", { email: req.body.email }).then(([client]) => {
        if (client) {
            return res.json({
                status: 1,
                errors: {
                    email: "Email already exists"
                }
            })
        }
        Contact.store(req.body).then(client => {
            return res.json({
                status: 0,
                client,
                message: "Contact added"
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: "Please try again later"
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

exports.update = (req, res) => {
    let { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            message: "Please try again later",
            errors
        })
    }
    if (req.body.id === undefined) {
        return res.json({
            status: 1,
            message: "Client not found"
        })
    }
    Contact.store(req.body, false).then(client => {
        if (!client) {
            return res.json({
                status: 1,
                message: "Client not found"
            })
        }
        return res.json({
            status: 0,
            client,
        });
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.delete = (req, res) => {
    if (!req.body.id) {
        return res.json({
            status: 1,
            message: "Client not found"
        })
    }
    Contact.delete(req.body.id).then((client) => {
        if (!client) {
            return res.json({
                status: 1,
                message: "Client not found"
            })
        }
        return res.json({
            status: 0,
            message: "Client deleted"
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
    const { page, perPage, kind, searchValue } = req.body;
    console.log("==========clientList", req.body);
    let condition = {};
    if (isEmpty(searchValue)) {
        condition = { deleted_at: null };
    }
    else if (kind == "Name") {
        condition = { deleted_at: null, name: searchValue }
    } else if (kind == "Email") {
        condition = { deleted_at: null, email: searchValue }
    }
    else if (kind == "Phone") {
        condition = { deleted_at: null, phone: searchValue }
    }
    console.log("=====cond:", condition);
    Contact.listWithPagination(condition, page, perPage, { orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            list,
            page, perPage, totalPage
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

exports.findOne = (req, res) => {
    if (!req.query.id) {
        return res.json({
            status: 1,
            message: "Client not found"
        })
    }
    Contact.findOne(req.query.id).then(client => {
        if (!client) {
            return res.json({
                status: 1,
                message: "Client not found"
            })
        }
        return res.json({
            status: 0,
            client
        })
    }).catch(err => {
        console.log("error:", err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}