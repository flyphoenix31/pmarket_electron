const moment = require('moment');
const mysql = require('./mysqlConnect');
const ioHandler = require('../ioHandler');

const TYPES = {
    SYSTEM: 1,
    JOB: 2,
    FILE: 3,
    QUOTATION: 4
}
const READ_STATUS = {
    UNREAD: 0,
    READ: 1
}
exports.TYPES = TYPES;
exports.READ_STATUS = READ_STATUS;

const generateJobUserNotification = (users, job) => {
    const currentDateStr = moment(new Date()).format("yyyy-MM-DD HH:mm:ss");
    return new Promise((resolve, reject) => {
        const newNotifications = [];
        const newNotification = {
            created_at: currentDateStr,
            updated_at: currentDateStr,
            subject: "New Job Alert",
            content: "You got a new Job Alert",
            is_read: 0,
            type_id: TYPES.JOB
        };
        users.forEach(userId => {
            newNotifications.push({
                ...newNotification,
                user_id: userId,
            })
        })
        ioHandler.sendNotification(users, newNotification);
        mysql.insertMany("notifications", newNotifications).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}
exports.generateJobUserNotification = generateJobUserNotification;

exports.generateJobRoleNotification = (role_id, job) => {
    return new Promise((resolve, reject) => {
        mysql.select("users", { role_id }).then(users => {
            const userIds = [];
            users.forEach(user => {
                userIds.push(user.id);
            })
            generateJobUserNotification(userIds).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

exports.unreadList = (user_id) => {
    return new Promise((resolve, reject) => {
        mysql.select("notifications", {user_id, is_read: READ_STATUS.UNREAD}, {orderBy: {id: 'desc'}}).then(list => {
            resolve(list);
        }).catch(err => {
            reject(err);
        })
    });
}

exports.makeRead = (user_id, notification_id) => {
    return new Promise((resolve, reject) => {
        mysql.update("notifications", {id: notification_id, user_id}, {is_read: READ_STATUS.READ}).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}