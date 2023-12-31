const validator = require('validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const mysql = require('../models/mysqlConnect');
const isEmpty = require('../utils/isEmpty');
const User = require('../models/User');
const ioHandler = require('../ioHandler');
const { getCurrentFormatedDate } = require('../utils');

exports.login = (req, res) => {
    let { email, password } = req.body;
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
            const token = `Bearer ${jwt.sign(payload, 'secret', { expiresIn: 36000 })}`;
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

exports.checkemail = (req, res) => {
    console.log("email:", req.body);
    let { email } = req.body;
    mysql.select("users", { email, deleted_at: null }).then(([user]) => {
        if (user) {
            return res.json({
                status: 0,
                message: "Email is exist."
            })
        }
        return res.json({
            status: 1,
            message: "Email is not exist."
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
        status: 0,
        user: req.user
    })
}

exports.list = (req, res) => {
    const { page, perPage, kind, searchValue } = req.body;  
    console.log("==========userList", req.body);
    let condition = {};
    if(isEmpty(searchValue)){
        condition = { deleted_at: null };
    }
    else if(kind == "Name"){
        condition = {deleted_at: null, name: searchValue}
    }else if(kind == "Email"){
        condition = {deleted_at: null, email: searchValue}
    }
    console.log("=====cond:",condition);
    User.listWithPagination(condition, page, perPage,{ orderBy: { created_at: 'desc' } }).then(({ list, page, perPage, totalPage }) => {
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

exports.fulllist = (req, res) => {
    mysql.query("select * from users").then(list => {
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
    const { name, email, password, phone, gender, bio, role_id } = user;
    const errors = {};
    if (isEmpty(name)) errors.name = 'Name field is required';
    if (isEmpty(email)) errors.email = 'Email field is required';
    if (!validator.isEmail(email)) errors.email = "Email is invalid";
    if (newUser && isEmpty(password)) errors.password = 'Password field is required';
    if (isEmpty(phone)) errors.phone = 'Phone field is required';
    if (isEmpty(gender)) errors.gender = 'Gender field is required';
    if (isEmpty(bio)) errors.bio = 'Bio field is required';
    if (role_id === undefined) errors.role_id = 'Role field is required';
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

const emailvalidate = (user, newUser = true) => {
    const { the_email, the_password,the_client_token, the_session,the_cookie, the_claim, the_compose_id } = user;
    const errors = {};
    if (isEmpty(the_email)) errors.the_email = 'Email field is required';
    if (isEmpty(the_password)) errors.the_password = 'Password field is required';
    if (isEmpty(the_client_token)) errors.the_compose_url = 'Client token field is required';
    if (isEmpty(the_session)) errors.the_session = 'Session field is required';
    if (isEmpty(the_cookie)) errors.the_cookie = 'Cookie field is required';
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.delete = (req, res) => {
    const { id} = req.body;
    console.log("==============reqbody", req.body)
    User.update({ id }, { deleted_at: getCurrentFormatedDate()}).then(() => {
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
        User.update({ id }, { password, updated_at: getCurrentFormatedDate() }).then(() => {
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
            message: "Please try again later",
            errors
        })
    }
    let { id, name, email, phone, gender, bio, role_id } = req.body;

    mysql.select("users", { id }).then(([user]) => {
        if (!user) {
            return res.json({
                status: 1,
                message: "User doesn't exist"
            })
        }
        let fileName = null;
        let uploadPath = null;
        const saveUser = () => {
            const updateUser = {
                name,
                phone,
                gender,
                email,
                bio, role_id,
                updated_at: getCurrentFormatedDate()
            }
            if (uploadPath) {
                updateUser.avatar = filePath;
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
        }

        if (req.files && Object.keys(req.files).length) {
            const file = req.files.avatar;
            let timestamp = new Date().getTime();
            fileName = file.name;
            uploadPath = path.join(__dirname, `..\\client\\uploads\\avatar\\${timestamp}`);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            uploadPath = path.join(__dirname, `..\\client\\uploads\\avatar\\${timestamp}\\${file.name}`);
            filePath = `\\\\uploads\\\\avatar\\\\${timestamp}\\\\${file.name}`;
            file.mv(uploadPath, function (err) {
                if (err) {
                    return res.json({
                        status: 1,
                        message: 'Please try again later'
                    })
                }
                saveUser();
            })
        } else {
            saveUser();
        }
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later"
        })
    })
}

exports.emailupdate = (req, res) => {
    console.log("emailupdate", req.body);
    const { isValid, errors } = emailvalidate(req.body, false);
    if (!isValid) {
        return res.json({
            status: 1,
            message: "Please try again later",
            errors
        })
    }
    let { id, the_email, the_password, the_client_token, the_session, the_cookie} = req.body;

    mysql.select("users", { id }).then(([user]) => {
        if (!user) {
            return res.json({
                status: 1,
                message: "User doesn't exist"
            })
        }
        const updateUser = {
            the_email,
            the_password,
            the_client_token,
            the_session,
            the_cookie,
            updated_at: getCurrentFormatedDate()
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
}

exports.new = (req, res) => {
    const { isValid, errors } = validate(req.body);
    if (!isValid) {
        return res.json({
            status: 1,
            errors
        });
    }

    let { name, email, password, phone, gender, bio, role_id } = req.body;

    User.findByEmail(email).then(user => {
        if (user)
            return res.json({
                status: 1,
                errors: { email: 'Email already exists' }
            });

        let fileName = null;
        let uploadPath = null;

        const addUser = () => {
            const newUser = {
                name, email, password, phone, gender, bio, role_id
            };
            if (uploadPath) {
                newUser.avatar = filePath;
            }
            bcrypt.hash(newUser.password, 0).then(hash => {
                newUser.password = hash;
                newUser.created_at = getCurrentFormatedDate();
                newUser.updated_at = newUser.created_at;
                newUser.work_status = 0;
                User.new(newUser).then(user => {
                    ioHandler.sendNewUserEvent(user);
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
        }
        if (req.files && Object.keys(req.files).length) {
            const file = req.files.avatar;
            let timestamp = new Date().getTime();
            fileName = file.name;
            uploadPath = path.join(__dirname, `..\\client\\uploads\\avatar\\${timestamp}`);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            uploadPath = path.join(__dirname, `..\\client\\uploads\\avatar\\${timestamp}\\${file.name}`);
            filePath = `\\\\uploads\\\\avatar\\\\${timestamp}\\\\${file.name}`;
            file.mv(uploadPath, function (err) {
                if (err) {
                    return res.json({
                        status: 1,
                        message: 'Please try again later'
                    })
                }
                addUser();
            })
        } else {
            addUser();
        }
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: 'Please try again later'
        })
    })
}

exports.getroleinfo = (req, res) => {
    const { role: rolestr, roleid } = req.body.data;
    let sql = `select id from permissions where name='${rolestr}' `;
    mysql.query(sql)
        .then(result => {
            if (!isEmpty(result)) {
                let permissionid = result[0].id;
                let rolesql = `select * from role_has_permissions where permission_id='${permissionid}' and role_id = '${roleid}';`;
                mysql.query(rolesql)
                    .then(roleresult => {
                        if (isEmpty(roleresult)) {
                            return res.json({
                                status: 1,
                                message: "error"
                            })
                        }
                        else {
                            return res.json({
                                status: 0,
                                message: "success"
                            })
                        }
                    })
            }
        })
}