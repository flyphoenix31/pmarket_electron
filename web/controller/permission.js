const mysql = require('../models/mysqlConnect');
const Permission = require('../models/Permission');
const isEmpty = require('../utils/isEmpty');
const validate = (permission, isNew = true) => {
    const { name } = permission;
    const errors = {};
    if (isEmpty(name)) errors.message = 'Name is required';

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
    mysql.select("permissions", { name: req.body.name }).then(([permission]) => {
        if (permission) {
            return res.json({
                status: 1,
                errors: { name: "Name already exists" }
            })
        }
        Permission.store(req.body).then(permission => {
            return res.json({
                status: 0,
                permission,
                message: "Permission added"
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

exports.update = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    if (!req.body.id) return res.json({
        status: 1,
        message: "Permission not found"
    })
    mysql.select("permissions", { id: { neq: req.body.id }, name: req.body.name }).then(([permission]) => {
        if (permission) {
            return res.json({
                status: 1,
                errors: { name: "Name already exists" }
            });
        }
        Permission.store(req.body, false).then(permission => {
            if (!permission) return res.json({
                status: 1,
                message: "Permission not found"
            })
            return res.json({
                status: 0,
                permission,
                message: "Permission updated"
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

exports.findOne = (req, res) => {
    if (!req.query.id) {
        return res.json({
            status: 1,
            message: "Permission not found"
        })
    }
    Permission.findOne(req.query.id).then(permission => {
        return res.json({
            status: 0,
            permission
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
    if (!req.query.page) {
        Permission.list().then(list => {
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
    } else {
        Permission.listWithPagination({ cond: null, page: req.query.page, perPage: req.query.perPage }).then(({ list, page, perPage, totalPage }) => {
            return res.json({
                status: 0,
                list,
                page,
                perPage,
                totalPage
            })
        }).catch(err => {
            console.log(err)
            return res.json({
                status: 1,
                message: "Please try again later"
            })
        })
    }
}