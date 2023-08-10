const validator = require('validator');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const History = require('../models/History');
const Notification = require('../models/Notification')
const { getCurrentFormatedDate } = require('../utils');

exports.list = (req, res) => {
    const { page, perPage, kind, searchValue } = req.body;  
    console.log("==========chathistoryList", req.body);
    let condition = {};
    if(isEmpty(searchValue)){
        condition = { deleted_at: null };
    }
    else if(kind == "Sender"){
        condition = {deleted_at: null, from_user_email: searchValue}
    }else if(kind == "Receiver"){
        condition = {deleted_at: null, to_user_email: searchValue}
    }
    console.log("=====cond:",condition);
    History.listWithPagination(condition, page, perPage,{ orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            history: list,
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

exports.delete = (req, res) => {
    const { id} = req.body;
    console.log("==============reqbody", req.body)
    History.update({ id }, { deleted_at: getCurrentFormatedDate()}).then(() => {
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