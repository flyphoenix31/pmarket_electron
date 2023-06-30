const validator = require('validator');
const bcrypt = require('bcrypt');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const Job = require('../models/Job');
const moment = require('moment');
const { escapeHTML } = require('../utils');

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
