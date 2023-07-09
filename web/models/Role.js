const { getCurrentFormatedDate, getProperPagination } = require('../utils');
const isEmpty = require('../utils/isEmpty');
const mysql = require('./mysqlConnect');

const TYPE = {
    SUPPORT_TEAM: 1,
    DEVELOPER: 2
}
exports.TYPE = TYPE;

exports.store = (data, isNew = true) => {
    return new Promise((resolve, reject) => {
        const { id, name, type } = data;
        const role = {
            name,
            updated_at: getCurrentFormatedDate(),
            guard_name: "web"
        }
        if (type) {
            role.type = type
        }
        if (isNew) {
            role.created_at = getCurrentFormatedDate()
        }
        (isNew ? mysql.insertOne("roles", role) : mysql.updateOne("roles", { id }, role)).then(role => {
            resolve(role);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        const roleQuery = mysql.selectQuery("roles", { id });
        const permissionQuery = mysql.selectQuery("role_has_permissions", { role_id: id });
        mysql.query(`${roleQuery} ${permissionQuery}`).then(([[role], permissions]) => {
            if (role)
                role.permissions = permissions;
            return resolve(role);
        }).catch(err => {
            reject(err);
        })
    })
}

const getRolesPermissions = (roles) => {
    return new Promise((resolve, reject) => {
        let query = ``;
        roles.forEach(role => {
            query += mysql.selectQuery("role_has_permissions", { role_id: role.id });
        })
        if (isEmpty(query)) return resolve(roles);
        mysql.query(query).then(result => {
            roles.forEach((role, index) => {
                role.permissions = result[index];
            })
            resolve(roles);
        }).catch(err => {
            reject(err);
        })
    })
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        mysql.select("roles").then(roles => {
            getRolesPermissions(roles).then(roles => {
                resolve(roles);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        });
    })
}

exports.listWithPagination = (cond, page_ = 1, perPage_ = 10) => {
    return new Promise((resolve, reject) => {
        mysql.select("roles", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("roles", null, { offset: (page - 1) * perPage, limit: perPage, orderBy: { id: 'desc' } }).then(list => {
                getRolesPermissions(list).then(list => {
                    resolve({
                        list,
                        page,
                        perPage,
                        totalPage
                    })
                }).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}