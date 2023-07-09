const nodemailer = require('nodemailer');
const moment = require('moment');
const MailAccount = require('../models/MailAccount');
const mysql = require('../models/mysqlConnect')
const escapeHTML = (str) => {
    if (str === undefined || str === null) {
        return str;
    }
    if (typeof (str) === 'string') {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    if (Array.isArray(str)) {
        let newStr = [];
        str.forEach(item => {
            newStr.push(escapeHTML(item));
        })
        return newStr;
    }
    if (typeof (str) === 'object') {
        let newStr = {};
        Object.keys(str).forEach(key => {
            if (key == "files") {
                newStr[key] = str[key];
            } else {
                newStr[key] = escapeHTML(str[key]);
            }
        })
        return newStr;
    }
    return str;
}
exports.escapeHTML = escapeHTML;

exports.escapeHTMLMiddleware = (req, res, next) => {
    req.body = escapeHTML(req.body);
    req.query = escapeHTML(req.query);
    req.params = escapeHTML(req.params);
    next();
}

exports.getProperPagination = (page, perPage, totalCount) => {
    page = Number(page) ?? 0;
    perPage = Number(perPage) ?? 0;
    if (page < 1) page = 1;
    if (perPage < 1) perPage = 10;
    let totalPage = Math.ceil(totalCount / perPage);
    if (totalPage < 1) totalPage = 1;
    if (totalPage < page) page = totalPage;
    return { page, perPage, totalPage };
}

exports.getCurrentFormatedDate = () => {
    return moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
}

exports.getSupportTeamUserIds = () => {
    return new Promise((resolve, reject) => {
        mysql.query(`select users.id from users left join roles on users.role_id = roles.id and roles.type = 1`).then(users => {
            const userIds = [];
            users.forEach(user => {
                userIds.push(user.id);
            })
            resolve(userIds);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.sendMail = ({ to, subject, html}) => {
    return new Promise((resolve, reject) => {
        MailAccount.getActiveAccount().then(mailAccount => {
            if (!mailAccount) {
                return resolve(false);
            }
            const transporter = nodemailer.createTransport({
                host: mailAccount.mail_host,
                port: mailAccount.mail_port,
                secure: false,
                auth: {
                    user: mailAccount.mail_username,
                    pass: mailAccount.mail_password
                }
            });
            transporter.sendMail({
                from: mailAccount.from_address, // sender address
                // from: 'mailtrap@pmarket.com', // sender address
                to,
                subject, // Subject line
                // text: "Hello world?", // plain text body
                html
            }).then(info => {
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        })
    })
}