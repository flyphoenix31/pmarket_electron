const Enquiry = require('../models/Enquiry');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const { getCurrentFormatedDate } = require('../utils');

const validate = (enquiry) => {
    const { name, email, subject, message } = enquiry;
    const errors = {};
    if (isEmpty(name)) errors.message = "Name is required";
    if (isEmpty(email)) errors.message = "Email is required";
    if (isEmpty(subject)) errors.message = "Subject is required";
    if (isEmpty(message)) errors.message = "Message is required";

    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.new = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    Enquiry.store(req.body).then(enquiry => {
        return res.json({
            status: 0,
            enquiry,
            message: "Sent successfuly"
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
    Enquiry.listWithPagination({ cond: null, page: req.query.page, perPage: req.query.perPage }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            list, page, perPage, totalPage
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
            message: "Enquiry not found"
        })
    }
    Enquiry.findOne(req.query.id).then(enquiry => {
        if (!enquiry) {
            return res.json({
                status: 1,
                message: "Enquiry not found"
            })
        }
        return res.json({
            status: 0,
            enquiry
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}

exports.moveToContact = (req, res) => {
    if (!req.body.id) {
        return res.json({
            status: 1,
            message: "Enquiry not found"
        })
    }
    Enquiry.findOne(req.body.id).then(enquiry => {
        if (!enquiry) {
            return res.json({
                status: 1,
                message: "Enquiry not found"
            })
        }
        mysql.select("contacts", { email: enquiry.email }).then(([contact]) => {
            const updateContact = {
                name: enquiry.name,
                email: enquiry.email,
                updated_at: getCurrentFormatedDate()
            };
            if (!contact) {
                updateContact.created_at = getCurrentFormatedDate();
            }
            Promise.all([
                (!contact?mysql.insertOne("contacts", updateContact):mysql.updateOne("contacts", {id: contact.id}, updateContact)),
                mysql.updateOne("enquiries", {id: enquiry.id}, {updated_at: getCurrentFormatedDate(), is_converted: Enquiry.IS_CONVERTED.YES})
            ]).then(([contact, enquiry]) => {
                return res.json({
                    status: 0,
                    contact,
                    enquiry,
                    message: "Moved to contact successfuly"
                })
            }).catch(err => {
                console.log(err);
                return res.json({
                    status: 1,
                    message: "Please try again later"
                })
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