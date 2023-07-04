const validator = require('validator');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const Notification = require('../models/Notification')

exports.unreadList = (req, res) => {
    Notification.unreadList(req.user.id).then(list => {
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

exports.makeRead = (req, res) => {
    if (req.body.id === undefined) {
        return res.json({
            status: 1,
            message: "Notification not found."
        })
    }
    Notification.makeRead(req.user.id, req.body.id).then(() => {
        return res.json({
            status: 0
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}
