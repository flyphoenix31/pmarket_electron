const mysql = require('mysql');
const query = (sql) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 33061,
        user: 'root',
        password: '123456789',
        database: 'creative_site'
    });
    return new Promise((resolve, reject) => {
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

module.exports = { query };