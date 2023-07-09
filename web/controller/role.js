const validator = require('validator');
const bcrypt = require('bcrypt');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const Role = require('../models/Role');

const validate = (role, isNew = true) => {
    const { name, type, permissions } = role;
    const errors = {};
    if (isEmpty(name)) errors.name = "Name is required";
    if (!isEmpty(type)) {
        if (type != Role.TYPE.SUPPORT_TEAM && type != Role.TYPE.DEVELOPER) {
            errors.type = "Type is invalid";
        }
    }
    if (isEmpty(permissions) || !Array.isArray(permissions)) {
        errors.permissions = "Permissions is invalid";
    }
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

const store = (req, res, isNew = true) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    const findQuery = {
        name: req.body.name
    };
    if (!isNew) {
        findQuery.id = { neq: req.body.id }
    }
    mysql.select("roles", findQuery).then(([existingRole]) => {
        if (existingRole) {
            return res.json({
                status: 1,
                errors: { name: "Name already exists" }
            })
        }
        Role.store(req.body, isNew).then(role => {
            if (!role) {
                return res.json({
                    status: 1,
                    message: "Role not found"
                })
            }
            const permissions = [];
            req.body.permissions.forEach(permission => {
                if (permissions.findIndex(item => item == permission) < 0) {
                    permissions.push({
                        permission_id: permission,
                        role_id: role.id
                    })
                }
            });
            let deleteQuery = mysql.deleteManyQuery("role_has_permissions", { role_id: role.id });
            let insertQuery = mysql.insertManyQuery("role_has_permissions", permissions);
            let selectQuery = mysql.selectQuery("role_has_permissions", { role_id: role.id });
            mysql.query(`${isNew ? '' : deleteQuery} ${insertQuery} ${selectQuery}`).then((result) => {
                role.permissions = result[result.length - 1];
                return res.json({
                    status: 0,
                    role,
                    message: isNew?"Role added":"Role updated"
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
        console.log(err)
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.new = (req, res) => {
    store(req, res);
}

exports.update = (req, res) => {
    store(req, res, false);
}

exports.list = (req, res) => {
    mysql.select("roles").then(list => {
        return res.json({
            status: 0,
            list
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}

exports.developerList = (req, res) => {
    mysql.select("roles", { type: 2 }).then(list => {
        return res.json({
            status: 0,
            list
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}

exports.findOne = (req, res) => {
    if (req.query.id === undefined)
        return res.json({
            status: 1,
            message: "Role not found"
        })
    Role.findOne(req.query.id).then(role => {
        if (!role) {
            return res.json({
                status: 1,
                message: "Role not found"
            })
        }
        return res.json({
            status: 0,
            role
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.listWithPermission = (req, res) => {
    if (!req.query.page) {
        Role.list().then(list => {
            return res.json({
                status: 0,
                list
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: "Please try again later."
            })
        })
    } else {
        Role.listWithPagination(null, req.query.page, req.query.perPage).then(({ list, page, perPage, totalPage }) => {
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
}