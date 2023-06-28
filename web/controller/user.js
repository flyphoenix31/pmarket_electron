const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const User = require('../models/User');
const moment = require('moment');
const { escapeHTML } = require('../utils');
const { escape } = require('mysql');

exports.login = (req, res) => {
    let { email, password } = req.body;
    email = escapeHTML(email);
    mysql.select("users", { email, deleted_at: null }).then(([user]) => {
        if (!user) {
            return res.json({
                status: 1,
                message: "Incorrect auth information."
            })
        }
        bcrypt.compare(password, user.password).then(isMatched => {
            if (!isMatched) throw ('password not matched');
            const payload = { id: user.id };
            const token = `Bearer ${jwt.sign(payload, 'secret', { expiresIn: 3600 })}`;
            console.log(jwt.decode(token));
            return res.json({
                status: 0,
                token,
                user
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: "Incorrect auth information."
            })
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    });
}

exports.current = (req, res) => {
    res.json({
        success: 0,
        user: req.user
    })
}

exports.list = (req, res) => {
    User.listWithPagination({ deleted_at: null}, req.query.page, req.query.perPage).then(({list, page, perPage, totalPage}) => {
        return res.json({
            status: 0,
            users: list,
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

exports.jobUsers = (req, res) => {
    mysql.query("select users.* from users, roles where users.role_id = roles.id and roles.name='designer'").then(list => {
        return res.json({
            status: 0,
            list
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

const validate = (user, newUser = true) => {
    const { name, email, password, phone, gender } = user;
    const errors = {};
    if (isEmpty(name)) errors.name = 'Name field is required';
    if (isEmpty(email)) errors.email = 'Email field is required';
    if (newUser && isEmpty(password)) errors.password = 'Password field is required';
    if (isEmpty(phone)) errors.phone = 'Phone field is required';
    if (isEmpty(gender)) errors.gender = 'Gender field is required';
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.delete = (req, res) => {
    const { id, isDelete } = req.body;
    User.update({ id }, { deleted_at: isDelete ? "2022-03-27 09:22:22" : null }).then(() => {
        res.json({
            status: 0
        })
    }).catch(err => {
        res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.updatePassword = (req, res) => {
    let { id, password } = req.body;
    if (isEmpty(password)) password = "123456789";
    bcrypt.hash(password, 0).then(hash => {
        password = hash;
        User.update({ id }, { password, updated_at: moment(new Date()).format("yyyy-MM-DD HH:mm:ss") }).then(() => {
            return res.json({
                status: 0,
                message: "Succeed"
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
    const { isValid, errors } = validate(req.body, false);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        })
    }
    let { id, name, email, phone, gender } = req.body;
    id = escapeHTML(id);
    name = escapeHTML(name);
    email = escapeHTML(email);
    phone = escapeHTML(phone);
    gender = escapeHTML(gender);

    mysql.select("users", { name, id: { neq: id } }).then(([user]) => {
        if (user) {
            return res.json({
                status: 1,
                errors: { name: "Name already exists" }
            })
        }
        mysql.select("users", { email, id: { neq: id } }).then(([user]) => {
            if (user) {
                return res.json({
                    status: 1,
                    errors: { email: "Email already exists" }
                })
            }
            const updateUser = {
                name,
                email,
                phone,
                gender,
                updated_at: moment(new Date()).format("yyyy-MM-DD HH:mm:ss")
            }
            User.update({ id }, updateUser).then(() => {
                res.json({
                    status: 0
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    status: 1,
                    message: 'Please try again later'
                })
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

exports.new = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        });
    }

    let { name, email, password, phone, gender } = req.body;
    name = escapeHTML(name);
    email = escapeHTML(email);
    phone = escapeHTML(phone);
    gender = escapeHTML(gender)

    User.findByName(name).then(user => {
        if (user) {
            return res.json({
                status: 1,
                errors: { name: 'Name already exists' }
            })
        }
        User.findByEmail(email).then(user => {
            if (user)
                return res.json({
                    status: 1,
                    errors: { email: 'Email already exists' }
                });
            const newUser = {
                name, email, password, phone, gender
            }
            bcrypt.hash(newUser.password, 0).then(hash => {
                newUser.password = hash;
                newUser.created_at = moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
                newUser.updated_at = newUser.created_at;
                newUser.work_status = 0;
                User.new(newUser).then(user => {
                    return res.json({
                        status: 0,
                        user
                    })
                }).catch(err => {
                    console.log(err);
                    return res.json({
                        status: 1,
                        message: "Please try again later"
                    })
                });
            }).catch(err => {
                console.log(err);
                res.json({
                    status: 1,
                    message: "Please try again later."
                })
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: 'Please try again later'
            })
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}