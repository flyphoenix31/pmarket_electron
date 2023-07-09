const Category = require('../models/Category');
const isEmpty = require('../utils/isEmpty');

const validate = (category) => {
    const { name } = category;
    const errors = {};
    if (isEmpty(name)) errors.name = "Name is required";
    
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
    Category.store(req.body).then(category => {
        return res.json({
            status: 0,
            category,
            message: "Category added"
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
    const { isValid, errors} = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    if (!req.body.id) {
        return res.json({
            status: 1,
            message: "Category not found"
        })
    }
    Category.store(req.body, false).then(category => {
        if (!category) {
            return res.json({
                status: 1,
                message: "Category not found."
            })
        }
        return res.json({
            status: 0,
            category,
            message: "Category updated"
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
    if (req.query.page === undefined || req.query.page == null) {
        Category.list().then(list => {
            return res.json({
                status: 0,
                list
            })
        }).catch(err => {
            return res.json({
                status: 1,
                message: "Please try again later"
            })
        })
    }
    Category.listWithPagination({ cond: null, page: req.query.page, perPage: req.query.perPage }).then(({ list, page, perPage, totalPage }) => {
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
            message: "Category not found"
        })
    }
    Category.findOne(req.query.id).then(category => {
        if (!category) {
            return res.json({
                status: 1,
                message: "Category not found"
            })
        }
        return res.json({
            status: 0,
            category
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}