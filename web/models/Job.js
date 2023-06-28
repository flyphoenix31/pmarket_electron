const { getProperPagination } = require('../utils');
const mysql = require('./mysqlConnect');

exports.listWithPagination = ({cond, page: page_, perPage: perPage_, extra}) => {
    return new Promise((resolve, reject) => {
        mysql.select("freelance_jobs", null, { isGetCount: true }).then(totalCount => {
            let { page, perPage, totalPage } = getProperPagination(page_, perPage_, totalCount);
            mysql.select("freelance_jobs", null, { offset: (page - 1) * perPage, limit: perPage, ...(extra??{}) }).then(list => {
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
    })
}

exports.findOne = (id) => {
    return new Promise((resolve, reject) => {
        const jobSql = `select * from freelance_jobs where id=${id};`;
        const categorySql = `select * from job_category where job_id=${id};`;
        const jobUserSql = `select * from job_users where job_id=${id} and status_id=1;`
        mysql.query(`${jobSql} ${categorySql} ${jobUserSql}`).then(([[job], categories, jobUsers]) => {
            return resolve({
                job, categories, jobUsers
            });
        }).catch(err => {
            reject(err);
        })
    })
}