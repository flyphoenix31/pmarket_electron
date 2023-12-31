const validator = require('validator');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const Email = require('../models/Email');
const Notification = require('../models/Notification')
const { getCurrentFormatedDate } = require('../utils');
var dotenv = require('dotenv');
var nodemailer = require('nodemailer');
const { mailer } = require('../../config');
const { gmail_email, gmail_password } = mailer;
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // service:'Gmail',
    // auth: {
    //     user: `${gmail_email}`,
    //     pass: `${gmail_password}`,
    // }
});


exports.compose = (req, res) => {
    let { send_email, receive_email, subject, content } = req.body;
    // let temp = 'hondasmile0401@gmail.com';
    // var mailOptions = {
    //     from: `${gmail_email}`,
    //     to: `${temp}`,
    //     subject: `${subject}`,
    //     text: `${content}`,
    //     html: `<b>${content}</b>`
    // };
    // console.log("---------------compose", mailOptions);
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log('Message error:', error);
    //         res.json({
    //             status: 1,
    //             message: 'Please try again later.'
    //         })
    //     } else {
    //         console.log('Message sent: ' + info.response);
    //         res.json({
    //             status: 0
    //         })
    //     }
    //     transporter.close();
    // });
    console.log("newComposeReq", req.body);
    let sql = `insert into emails(sender_email, receiver_email,subject, content, created_at) values('${isEmpty(send_email) ? '' : send_email}', '${isEmpty(receive_email) ? '' : receive_email}','${isEmpty(subject) ? '' : subject}', '${isEmpty(content) ? '' : content}', '${getCurrentFormatedDate()}');`;
    console.log("-------newComposeSql", sql);
    mysql.query(sql)
        .then(result => {
            global.connections.forEach(connection => {
                console.log("socket connection:", connection.userInfo);
                if(!isEmpty(connection.userInfo)){
                    if(receive_email == connection.userInfo.email){
                        console.log("------------------compose")
                        connection.emit("sendemail", {send_email: send_email,receive_email:receive_email,subject: subject, content: content,type:"compose"});
                    }
                }
            });
            return res.json({
                status: 0
            })
        })
        .catch(err => {
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        })
}

exports.list = (req, res) => {
    const { page, perPage, kind, searchValue } = req.body;
    console.log("==========clientList", req.body);
    let condition = {};
    if (isEmpty(searchValue)) {
        condition = { deleted_at: null };
    }
    else if (kind == "Sender") {
        condition = { deleted_at: null, sender_email: searchValue }
    }
    else if (kind == "Receiver") {
        condition = { deleted_at: null, receiver_email: searchValue }
    }
    console.log("=====cond:", condition);
    Email.listWithPagination(condition, page, perPage, { orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            list,
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

exports.slist = (req, res) => {
    const { page, perPage, kind, searchValue, email } = req.body;
    console.log("==========sclientList", req.body);
    let condition = {};
    if (isEmpty(searchValue)) {
        condition = { deleted_at: null, sender_email: email};
    }
    else if (kind == "Name") {
        condition = { deleted_at: null, name: searchValue, sender_email: email  }
    } else if (kind == "Email") {
        condition = { deleted_at: null, email: searchValue, sender_email: email }
    }
    else if (kind == "Phone") {
        condition = { deleted_at: null, phone: searchValue, sender_email: email }
    }
    console.log("=====cond:", condition);
    Email.listWithPagination(condition, page, perPage, { orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            list,
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

exports.rlist = (req, res) => {
    const { page, perPage, kind, searchValue, email } = req.body;
    console.log("==========rclientList", req.body);
    let condition = {};
    if (isEmpty(searchValue)) {
        condition = { deleted_at: null, receiver_email: email};
    }
    else if (kind == "Name") {
        condition = { deleted_at: null, name: searchValue, receiver_email: email }
    } else if (kind == "Email") {
        condition = { deleted_at: null, email: searchValue, receiver_email: email }
    }
    else if (kind == "Phone") {
        condition = { deleted_at: null, phone: searchValue, receiver_email: email }
    }
    console.log("=====cond:", condition);
    Email.listWithPagination(condition, page, perPage, { orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
        return res.json({
            status: 0,
            list,
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
    console.log("==============emaildelete", req.body)
    Email.update({ id }, { deleted_at: getCurrentFormatedDate()}).then(() => {
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

exports.findOne = (req, res) => {
    Job.findOne(req.query.id).then(({ job, categories, jobUsers }) => {
        if (!job) {
            return res.json({
                status: 1,
                message: 'Job not found.'
            })
        }
        return res.json({
            status: 0,
            job, categories, jobUsers
        })
    }).catch(err => {
        return res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

exports.categories = (req, res) => {
    mysql.select('category_list').then(list => {
        return res.json({
            status: 0,
            list
        })
    }).catch(err => {
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}

const validate = (job, isNew = true) => {
    const { title, short_description, full_description, job_nature, tags, budget, jobUsers, categories, delivery_day } = job;
    const errors = {};
    if (isEmpty(title)) errors.message = 'Title field is required';
    if (isEmpty(short_description)) errors.message = 'Short desciription field is required';
    if (isEmpty(full_description)) errors.message = 'Full description field is required';
    if (job_nature === undefined) errors.message = 'Job nature field is required';
    // if (isEmpty(tags)) errors.tags = 'Tags field is required';
    // if (false && isNew && isEmpty(jobUsers)) errors.jobUsers = "Designers field is required";
    if (isEmpty(categories)) errors.message = "Category field is required";
    else if (!Array.isArray(categories)) errors.message = "Category is invalid";
    if (!delivery_day) errors.message = "Delivery Day field is required";
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.new = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        });
    }
    console.log("========newEmail:", req.body);
    let { title, short_description, full_description, job_nature, tags, is_featured, is_urgent, budget, categories, delivery_day, role, users } = req.body;

    const newJob = {
        title,
        short_description,
        full_description,
        job_nature,
        tags,
        is_featured,
        is_urgent,
        budget,
        delivery_day,
        status_id: 1,
        created_at: getCurrentFormatedDate(),
        updated_at: getCurrentFormatedDate()
    }
    if (role) {
        newJob.type_id = 1;
    } else if (users && Array.isArray(users) && users.length) {
        newJob.type_id = 2;
    }

    mysql.insertOne("freelance_jobs", newJob).then(job => {
        const promiseArray = [];
        const newCategories = [];
        const newJobDistributions = [];
        categories.forEach(item => {
            newCategories.push({ category_id: item, job_id: job.id });
        });
        if (role) {
            newJobDistributions.push({
                created_at: getCurrentFormatedDate(),
                updated_at: getCurrentFormatedDate(),
                job_id: job.id,
                role_id: role
            });
            // promiseArray.push(Notification.generateJobRoleNotification(role, job));
        } else if (users && Array.isArray(users) && users.length) {
            users.forEach(user_id => {
                newJobDistributions.push({
                    created_at: getCurrentFormatedDate(),
                    updated_at: getCurrentFormatedDate(),
                    job_id: job.id,
                    user_id: user_id
                })
            })
            // promiseArray.push(Notification.generateJobUserNotification(users, job));
        }
        promiseArray.push(mysql.insertMany("job_distribution_list", newJobDistributions));
        promiseArray.push(mysql.insertMany("job_category", newCategories));
        Promise.all(promiseArray).then(() => {
            return res.json({
                status: 0
            })
        }).catch(err => {
            console.log(err);
            return res.json({
                status: 1,
                message: "Please try again later."
            })
        });
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    });
}

exports.update = (req, res) => {
    const { isValid, errors } = validate(req.body, false);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        });
    }

    let { id, title, short_description, full_description, job_nature, tags, is_featured, is_urgent, budget, categories, delivery_day } = req.body;

    const updatedJob = {
        title,
        short_description,
        full_description,
        job_nature,
        tags,
        is_featured,
        is_urgent,
        budget,
        delivery_day,
        updated_at: getCurrentFormatedDate()
    };
    let newCategorySQL = '';
    categories.forEach(item => {
        newCategorySQL += mysql.getInsertQuery("job_category", { category_id: item, job_id: id });
    });
    Promise.all([
        mysql.update("freelance_jobs", { id }, updatedJob),
        mysql.query(`delete from job_category where job_id = ${id};${newCategorySQL}`)
    ]).then(() => {
        return res.json({
            status: 0
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later.'
        })
    })
}

exports.closeJob = (req, res) => {
    if (!req.body.id) {
        return res.json({
            status: 1,
            message: "Job not found"
        })
    }
    Job.closeJob(req.body.id).then((job) => {
        if (!job) {
            return res.json({
                status: 1,
                message: "Job not found"
            })
        }
        return res.json({
            status: 1,
            job,
            message: "Job closed successfuly"
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 1,
            message: "Please try again later."
        })
    })
}