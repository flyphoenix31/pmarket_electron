const fs = require('fs');
const path = require('path');

const ioHandler = require('../ioHandler');

const Shared = require('../models/Shared');
const mysql = require('../models/mysqlConnect');
const { fileUpload } = require('../models/Shared');
const { getCurrentFormatedDate } = require('../utils');
const isEmpty = require('../utils/isEmpty');

const validate = (data) => {
    const { id , name } = data;
    const errors = {};
    if(isEmpty(id)) errors.id = "Id field is required";
    if(isEmpty(name)) errors.name = "Name field is required";
    return {
        isValid: !Object.keys(errors).length,
        errors
    }
}

exports.sharelogin = (req, res) => {
    let { email, password } = req.body;
    mysql.select("shared", { email, password }).then(([user]) => {
        if (!user) {
            return res.json({
                status: 1,
                message: "Incorrect auth information."
            })
        }
        return res.json({
            status: 0,
            user
        })
    }).catch(err => {
        console.log(err);
        return res.json({
            status: 1,
            message: "Please try again later."
        })
    });
}

exports.new = (req, res) => {
    let data = req.body;
    console.log("newfolder:", data)
    if(data.name == ''){
        data.name = "New Folder";
        data = {...data};
    }
    Shared.makeFolder(data).then(() => {
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

exports.savetp = (req, res) => {
    const { id, token, password, email, shareMode } = req.body;
    console.log("----------------savetp:",req.body);
    if(shareMode == 0){
        mysql.updateOne('shared', {id: id}, {token:token, password: password, shareMode:0})
            .then(result => {
                console.log("editnameresult:",result);
                return res.json({
                    status: 0,
                })
            })
            .catch(err => {
                return res.json({
                    status: 1,
                    message: "Please try again later"
                })
            })
    }
    else if(shareMode == 1){
        mysql.updateOne('shared', {id: id}, {token:token, password: password, email: email,shareMode:1 })
        .then(result => {
            console.log("editnameresult:",result);
            return res.json({
                status: 0,
            })
        })
        .catch(err => {
            return res.json({
                status: 1,
                message: "Please try again later"
            })
        })
    }

}

exports.savem = (req, res) => {
    const { id , email } = req.body;
    console.log("savem:", id, email);
    mysql.updateOne('shared', {id: id}, {email: email})
        .then(result => {
            return res.json({
                status: 0
            })
        })
        .catch(err => {
            return res.json({
                status : 1,
                message: "Please try again later"
            })
        })
}

exports.editname = (req, res) => {
    const {id, name } = req.body;
    console.log("sharerename:", id , name);
    let { isValid, errors } = validate(req.body);
    if(!isValid){
        return res.json({
            status: 1,
            errors
        })    
    }
    mysql.updateOne('shared', {id: id}, {name: name})
        .then(result => {
            console.log("editnameresult:",result);
            res.json({
                status: 0,
            })

        })
        .catch(err => {
            console.log("error:", err);
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        }) 
}

exports.delete = (req, res) => {
    const {id} = req.body;
    console.log("sharedeleteid:", id);
    mysql.updateOne('shared', {id: id}, {is_deleted: 1})
        .then(result => {
            res.json({
                status: 0,
            })

        })
        .catch(err => {
            console.log("error:", err);
            res.json({
                status: 1,
                message: 'Please try again later.'
            })
        }) 
}

exports.list = (req, res) => {
    let { isDeleted: is_deleted, user_id} = req.body;
    console.log("listbody",req.body);
    let sql = `select * from shared WHERE is_deleted=0 and user_id='${user_id}' ORDER BY created_at DESC;`;
    mysql.query(sql)
        .then(result => {
            console.log("---------result:")
            return res.json({
                status:0,
                result,
            })
        })
}

exports.sharelist = (req, res) => {
    let { is_deleted, user_id, token} = req.body;
    console.log("listbody",req.body);
    let sql = `select * from shared WHERE is_deleted=0 and token='${token}' ORDER BY created_at DESC;`;
    mysql.query(sql)
        .then(result => {
            return res.json({
                status:0,
                result,
            })
        })
}

exports.gettoken = (req, res) => {
    let { is_deleted ,token } = req.body;
    console.log("listbody1111",req.body);
    let sql = `select * from shared WHERE is_deleted=0 and token='${token}' ORDER BY created_at DESC;`;
    mysql.query(sql)
        .then(result => {
            console.log("---------gametokenresult", result);
            if(isEmpty(result)){
                return res.json({
                    status: 1,
                    message: 'Please try again later'
                })
            }
            return res.json({
                status:0,
                result,
            })
        })
}

exports.unreadCounts = (req, res) => {
    Shared.getUnreadCounts(req.user.id).then(({ total, unreads }) => {
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

exports.fileupload = (req, res) => {
    console.log("fileupload:",req.body, req.files.file);
    let file;
    let uploadPath = undefined;
    let fileName = undefined;
    let filePath = undefined;
    const saveData = () => {
        const newData = {
            name: file.name,
            file_size: file.size + "Byte",
            created_at: req.body.created_at,
            user_id: req.body.user_id,
        };
        if (uploadPath) {
            newData.filepath = filePath;
        }
        Shared.fileUpload(newData).then((message) => {
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
        file = req.files.file;
        let timestamp = new Date().getTime();
        fileName = file.name;
        uploadPath = path.join(__dirname, `..\\client\\uploads\\shared`);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        uploadPath = path.join(__dirname, `..\\client\\uploads\\shared\\${file.name}`);
        filePath = `\\\\uploads\\\\shared\\\\${file.name}`;
        file.mv(uploadPath, function (err) {
            if (err) {
                return res.json({
                    status: 1,
                    message: 'Please try again later'
                })
            }
            saveData();
        })
    } else {
        saveData();
    }
}