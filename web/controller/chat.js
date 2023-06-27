const fs = require('fs');
const moment = require('moment');
const path = require('path');

const ioHandler = require('../ioHandler');

const Message = require('../models/Message');
const mysql = require('../models/mysqlConnect');
const { escapeHTML } = require('../utils');
exports.contacts = (req, res) => {
    mysql.query(`select *, (select id from messages where users.id=messages.from_user or users.id=messages.to_user order by messages.id desc limit 1) messageId from users where users.id != ${req.user.id} order by messageId desc`).then(contacts => {
        res.json({
            status: 0,
            contacts
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: 'Please try again later'
        })
    });
}

exports.list = (req, res) => {
    Message.makeRead(req.body.id, req.user.id).then(() => {
        Message.getWithUser(req.user.id, req.body.id).then(messages => {
            return res.json({
                status: 0,
                messages
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 1,
                message: 'Please try again later'
            })
        })
    }).catch(err => {
        console.log(err)
        res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.makeRead = (req, res) => {
    Message.makeRead(req.body.id, req.user.id).then(() => {
        return res.json({
            status: 0,
        })
    }).catch(err => {
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.unreadCounts = (req, res) => {
    Message.getUnreadCounts(req.user.id).then(({ total, unreads }) => {
        return res.json({
            status: 0,
            total,
            unreads
        })
    }).catch(err => {
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.sendMessage = (req, res) => {
    const { to: to_user, message } = req.body;
    let uploadPath = undefined;
    let fileName = undefined;
    let filePath = undefined;
    const addMessage = () => {
        const newMessage = {
            from_user: req.user.id,
            to_user,
            message: escapeHTML(message),
            is_read: 0,
            created_at: moment(new Date).format("yyyy-MM-DD HH:mm:ss"),
            updated_at: moment(new Date).format("yyyy-MM-DD HH:mm:ss")
        };
        if (uploadPath) {
            newMessage.filePath = filePath;
            newMessage.fileName = fileName;
        }
        Message.sendMessage(newMessage).then((message) => {
            ioHandler.newMessage(message);
            return res.json({
                status: 0
            });
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: 'Please try again later'
            })
        })
    }
    if (req.files && Object.keys(req.files).length) {
        const file = req.files.file;
        let timestamp = new Date().getTime();
        fileName = file.name;
        uploadPath = path.join(__dirname, `..\\client\\uploads\\chat\\${timestamp}`);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        uploadPath = path.join(__dirname, `..\\client\\uploads\\chat\\${timestamp}\\${file.name}`);
        filePath = `\\\\uploads\\\\chat\\\\${timestamp}\\\\${file.name}`;
        file.mv(uploadPath, function (err) {
            if (err) {
                return res.json({
                    status: 1,
                    message: 'Please try again later'
                })
            }
            addMessage();
        })
    } else {
        addMessage();
    }
}