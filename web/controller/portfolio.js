const moment = require('moment');
const Portfolio = require('../models/Portfolio');
const isEmpty = require('../utils/isEmpty');
const validator = require('validator')
const mysql = require('../models/mysqlConnect');

const validate = (portfolio, newPortfolio = true) => {
    const { tag, title, is_featured, sub_title, content, slug_url } = portfolio;
    const errors = {};
    if (isEmpty(tag)) errors.tag = "Tag field is required";
    if (isEmpty(title)) errors.title = "Title is required";
    if (isEmpty(sub_title)) errors.sub_title = "Sub title is required";
    if (isEmpty(content)) errors.content = "Content date is required";
    if (isEmpty(slug_url)) errors.notes = "Slug is required";
    if (is_featured === undefined) errors.is_featured = "Featured field is required";
    else if (is_featured != 0 && is_featured != 1) errors.is_featured = "Featured is invalid";

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
    Portfolio.store(req.body).then(portfolio => {
        return res.json({
            status: 0,
            portfolio
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
    if (req.body.id === undefined) {
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    }
    Portfolio.store(req.body, false).then(portfolio => {
        return res.json({
            status: 0,
            portfolio
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
    Portfolio.listWithPagination(null, req.query.page, req.query.perPage).then(({ list, page, perPage, totalPage }) => {
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
    Portfolio.findOne(req.query.id).then(([portfolio]) => {
        if (!portfolio) {
            return res.json({
                status: 1,
                message: "Portfolio not found"
            })
        }
        return res.json({
            status: 0,
            portfolio
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
            message: 'Portfolio not found'
        })
    }
    Portfolio.delete(req.body.id).then(() => {
        return res.json({
            status: 0,
            message: 'Portfolio deleted'
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}