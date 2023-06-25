const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const { findByName, findByEmail } = require('../models/User');

exports.login = (req, res) => {
    const { email, password } = req.body;
    mysql.query(`select * from users where email='${email}'`).then(result => {
        const [user] = result;
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
    mysql.query("select * from users").then(users => {
        return res.json({
            status: 0,
            users
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}

exports.new = (req, res) => {
    const { name, email, password, phone, gender: gender_id } = req.body;
    const errors = {};
    if (isEmpty(name)) errors.name = 'Name field is required';
    if (isEmpty(email)) errors.email = 'Email field is required';
    if (isEmpty(password)) errors.password = 'Password field is required';
    if (isEmpty(phone)) errors.phone = 'Phone field is required';
    if (isEmpty(gender)) errors.gender = 'Gender field is required';
    if (!isEmpty(errors))
        return res.json({
            status: 1,
            errors
        });

    findByName(name).then(user => {
        if (user)
            return res.json({
                status: 0,
                errors: { name: 'Name already exists' }
            })
        findByEmail(email).then(user => {
            if (user)
                return res.json({
                    status: 0,
                    errors: { email: 'Email already exists' }
                })
            const newUser = {
                name, email, password, phone, gender_id
            }
            bcrypt.hash(newUser.password, 0).then(hash => {
                newUser.password = hash;
                mysql.query(`insert into users (name, email, password, phone, gender_id) values('${newUser.name}', '${newUser.email}', '${newUser.password}', '${newUser.phone}', '${newUser.gender_id}')`).then(() => {
                    return res.json({
                        status: 0
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