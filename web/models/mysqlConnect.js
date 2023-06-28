const mysql = require('mysql');
const isEmpty = require('../utils/isEmpty');
const query = (sql) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 33061,
        user: 'root',
        password: '123456789',
        database: 'creative_site',
        multipleStatements: true
    });
    return new Promise((resolve, reject) => {
        if (isEmpty(sql)) {
            return resolve();
        }
        connection.query(sql, (err, results, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
            connection.end();
            return;
        });
    });
}

const getInsertQuery = (table, params) => {
    let insertQuery = `insert into ${table} (`;
    let valuesStr = `values(`;
    Object.keys(params).forEach((key, index) => {
        if (index) {
            insertQuery += ',';
            valuesStr += ',';
        }
        insertQuery += key;
        if (typeof (params[key]) == 'string')
            valuesStr += `'${params[key]}'`;
        else
            valuesStr += `${params[key]}`;
    })
    insertQuery += ') ';
    valuesStr += ');';
    insertQuery += valuesStr;
    return insertQuery;
}

const insertOne = (table, params) => {
    return new Promise((resolve, reject) => {
        let insertQuery = getInsertQuery(table, params);
        query(insertQuery).then(({ insertId }) => {
            query(`select * from ${table} where id = ${insertId}`).then(([item]) => {
                resolve(item);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

const insertMany = (table, params) => {
    return new Promise((resolve, reject) => {
        let insertQuery = '';
        params.forEach(param => {
            insertQuery += getInsertQuery(table, param);
        })
        query(insertQuery).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

const generateCondStr = (conds, statement = 'and') => {
    console.log("asdf", conds, statement);
    if (typeof (conds) != 'object' || conds === null || conds.eq !== undefined || conds.neq !== undefined || conds.like !== undefined) {
        if (conds === null)
            return `${statement} is null`;
        if (typeof (conds) === 'string')
            return `${statement} = '${conds}'`;
        if (typeof (conds) == "object") {
            if (conds.like !== undefined) {
                return `${statement} like '${conds.like}'`;
            }
            else if (conds.eq !== undefined) {
                if (conds.eq === null) {
                    return `${statement} is null`;
                } else {
                    return `${statement} = '${conds.eq}'`
                }
            } else if (conds.neq !== undefined) {
                if (conds.neq === null) {
                    return `${statement} is not null`;
                } else {
                    return `${statement} != '${conds.neq}'`
                }
            }
        }
        return `${statement} = ${conds}`
    }
    let str = '(';
    if (Array.isArray(conds)) {
        conds.forEach((cond, index) => {
            if (index) str += ` ${statement}`;
            str += ' ' + generateCondStr(cond);
        });
        str += ')';
        return str;
    }
    Object.keys(conds).forEach((key, index) => {
        if (index) {
            str += ` ${statement}`;
        }
        str += ' ' + generateCondStr(conds[key], key);
    })
    str += ')';
    return str;
}

const update = (table, conds, params) => {
    return new Promise((resolve, reject) => {
        let findQuery = ' where ';
        findQuery += generateCondStr(conds);

        let setQuery = ' set';
        Object.keys(params).forEach((key, index) => {
            if (index) {
                setQuery += ' ,';
            }
            if (typeof (params[key]) == 'string')
                setQuery += ` ${key}='${params[key]}'`;
            else
                setQuery += ` ${key}=${params[key]}`;
        });

        let updateQuery = `update ${table}` + setQuery + findQuery;
        query(updateQuery).then(result => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
}

const select = (table, conds, extra = {}) => {
    return new Promise((resolve, reject) => {
        let findQuery = '';
        if (conds) {
            findQuery = ' where';
            findQuery += generateCondStr(conds);
        }
        console.log(generateCondStr(conds));
        let extraQuery = '';
        if (extra.orderBy) {
            extraQuery = 'order by ';
            Object.keys(extra.orderBy).forEach((key, index) => {
                if (index) extraQuery += ' ,';
                extraQuery += `${key} ${extra.orderBy[key]}`;
            })
        }
        if (extra.limit) {
            extraQuery += ` limit ${extra.limit}`
        }
        if (extra.offset) {
            extraQuery += ` offset ${extra.offset}`
        }
        let selectQuery = `select *`;
        if (extra.isGetCount) {
            selectQuery = `select count(*) cnt`;
        }
        query(`${selectQuery} from ${table} ${findQuery} ${extraQuery}`).then(result => {
            if (extra.isGetCount) {
                return resolve(result[0].cnt);
            }
            return resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = { query, select, getInsertQuery, insertOne, insertMany, update };