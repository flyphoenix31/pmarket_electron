const moment = require('moment');

const Invoice = require('../models/Invoice');

exports.list = (req, res) => {
    Invoice.list(req.body).then(list => {
        res.json({
            status: 0,
            list
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
    Invoice.findOne(req.body.id).then(({invoice, items}) => {
        return res.json({
            status: 0,
            invoice,
            items
        })
    }).catch(err => {
        console.log("error:", err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}