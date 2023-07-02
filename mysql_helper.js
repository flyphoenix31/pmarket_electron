const si = require('systeminformation');
var child_process = require('child_process');
const ps = require('ps-node');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const mysqlPath = path.join(__dirname, "mysql");

const mysqlPathFilter = (path) => {
    const dangerLetters = ['r', 'n', 'b', 't', 'v'];
    dangerLetters.forEach(letter => {
        path = path.replaceAll(`\\${letter}`, `\\\\${letter}`);
    });
    return path;
}

const initIniFile = (/*{ port = 33061 }*/) => {
    const port = 33061
    const initContent =
        `[client]
port=${port}
[mysql]
no-beep
[mysqld]
explicit_defaults_for_timestamp = 1
port=${port}
datadir='${mysqlPathFilter(path.join(mysqlPath, "data\\Data"))}'
#datadir="${__dirname}\\mysql\\data\\Data"
default-storage-engine=INNODB
sql-mode="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
log-output=FILE
general-log=0
general_log_file="DESKTOP-7QD7IA6.log"
slow-query-log=1
slow_query_log_file="DESKTOP-7QD7IA6-slow.log"
long_query_time=10
log-error="DESKTOP-7QD7IA6.err"
server-id=1
lower_case_table_names=1
secure-file-priv='${mysqlPathFilter(path.join(mysqlPath, "data\\Uploads"))}'
#secure-file-priv="${__dirname}\\mysql\\data\\Uploads"
max_connections=151
table_open_cache=2000
tmp_table_size=141M
myisam_max_sort_file_size=2146435072
myisam_sort_buffer_size=271M
key_buffer_size=8M
read_buffer_size=128K
read_rnd_buffer_size=256K
innodb_flush_log_at_trx_commit=1
innodb_log_buffer_size=16M
innodb_buffer_pool_size=128M
innodb_log_file_size=48M
innodb_thread_concurrency=17
innodb_autoextend_increment=64
innodb_buffer_pool_instances=8
innodb_concurrency_tickets=5000
innodb_old_blocks_time=1000
innodb_stats_on_metadata=0
innodb_file_per_table=1
innodb_checksum_algorithm=0
flush_time=0
join_buffer_size=256K
max_allowed_packet=4M
max_connect_errors=100
open_files_limit=4161
sort_buffer_size=256K
binlog_row_event_max_size=8K
sync_master_info=10000
sync_relay_log=10000
sync_relay_log_info=10000`;
    return new Promise(resolve => {
        fs.writeFile(path.join(mysqlPath, "data\\pmarket.ini"), initContent, (err) => {
            console.log(err);
            resolve({ err });
        })
    })
}

const findMySqlProcess = () => {
    return new Promise(resolve => {
        si.processes().then(data => {
            const index = data.list.findIndex(item => item.name == 'pmarket_mysqld.exe');
            if (index < 1) {
                resolve(null);
            }
            else {
                resolve(data.list[index]);
            }
        });
    });
}

const killServer = () => {
    return new Promise(resolve => {
        findMySqlProcess().then(process => {
            if (process) {
                child_process.exec(`taskkill /f /pid ${process.pid}`, (error, stdout, stderr) => {
                    console.log('mysql killed');
                });
            }
        });
        const check = () => {
            findMySqlProcess().then(process => {
                if (!process) {
                    resolve();
                    return;
                }
                setTimeout(check, 1000);
            })
        };
        check();
    });
}

const startServer = () => {
    return new Promise(resolve => {
        killServer().then(() => {
            initIniFile().then(() => {
                let isResolved = false;
                let cmd = `"${path.join(mysqlPath, "server\\bin\\pmarket_mysqld.exe")}" --defaults-file="${path.join(mysqlPath, "data\\pmarket.ini")}"`;
                // console.log(cmd);
                // cmd = `"${mysqlPathFilter(path.join(mysqlPath, "server\\bin\\pmarket_mysqld.exe"))}" --defaults-file="${mysqlPathFilter(path.join(mysqlPath, "data\\pmarket.ini"))}"`;
                // console.log(cmd);
                // const cmd = `"${__dirname}\\mysql\\server\\bin\\pmarket_mysqld.exe\" --defaults-file="${__dirname}\\mysql\\data\\pmarket.ini"`;
                global.sendLog(`starting server: ${cmd}`);
                const process = child_process.exec(cmd, (error, stdout, stderr) => {
                    // console.log("error:", error);
                    // console.log("stdout:", stdout);
                    // console.log("stderr:", stderr);
                    global.sendLog(`error: ${JSON.stringify(error)}`);
                    global.sendLog(`stdout: ${JSON.stringify(stdout)}`);
                    global.sendLog(`stderr: ${JSON.stringify(stderr)}`);
                    if (!isResolved) {
                        isResolved = true;
                        setTimeout(() => resolve(), 5000);
                    }
                });

                process.on("spawn", () => {
                    console.log('spawn');
                    if (!isResolved) {
                        isResolved = true;
                        setTimeout(() => resolve(), 5000);
                    }
                });
                process.on("close", (number, signal) => console.log("close:", number, signal));
                process.on("disconnect", () => console.log("disconnect"));
                process.on("error", (err) => console.log("error:", err));
                process.on("exit", (number, signal) => console.log("exit:", number, signal));
                process.on("message", (message) => console.log("message:", message));
            })
        })
    })
}

const checkMysqlServerStatus = () => {
    findMySqlProcess().then(process => {
        global.sendEvent({ type: 'mysql_status', data: process ? true : false });
    }).catch(err => { }).finally(() => {
        setTimeout(checkMysqlServerStatus, 5000);
    });
}

checkMysqlServerStatus();

const backup = () => {
    return new Promise((resolve, reject) => {
        let isReturned = false;
        const process = child_process.exec(`${path.join(__dirname, "mysql\\server\\bin\\mysqldump.exe")} -u root --password=123456789 --port=33061 creative_site > "${path.join(__dirname, `backup\\mysql\\${moment(new Date()).format("yyyy-MM-DD_HH_mm_ss")}.sql`)}"`, (error, stdout, stderr) => {
        });
        process.on('close', (data) => {
            if (!isReturned) {
                isReturned = true;
                resolve();
            }
        });
        process.on('error', (data) => {
            if (!isReturned) {
                isReturned = true;
                reject();
            }
        })
    })
}

module.exports = {
    initIniFile,
    startServer,
    killServer,
    backup
};